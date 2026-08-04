import {
  DOCUMENT_CREATION_OPTIONS,
  DOCUMENT_PACKAGES,
  DOCUMENTS_WORKSPACE_DEFAULTS,
} from '../../data/documents-workspace-mock.js';
import { createDocumentFromCreationResult } from '../../domain/document-creation-options.js';
import { createDocumentDetail } from '../../domain/document-detail.js';
import {
  appendPackage,
  collectExpandedPackageIds,
  filterPackageTree,
  findPackageById,
  getPackageBreadcrumbs,
  renamePackage,
} from '../../domain/document-packages.js';
import { createDocumentsTableSnapshot } from '../../domain/documents-table.js';
import { createDocumentDetailDrawer } from './document-detail-drawer.js';
import { createDocumentsList } from './documents-list.js';
import { createNewDocumentTypePickerDrawer } from './new-document-type-picker-drawer.js';
import {
  createPackageSidebar,
  DEFAULT_PACKAGE_SIDEBAR_WIDTH,
} from './package-sidebar.js';

function updateSetValue(source, value, enabled) {
  const next = new Set(source);
  if (enabled) next.add(value);
  else next.delete(value);
  return next;
}

export function createDocumentsSection() {
  const element = document.createElement('section');
  element.className = 'documents-section';
  element.setAttribute('aria-label', 'Рабочая область документов');

  const defaults = DOCUMENTS_WORKSPACE_DEFAULTS;
  const state = {
    packages: DOCUMENT_PACKAGES,
    selectedPackageId: defaults.selectedPackageId,
    expandedPackageIds: new Set(defaults.expandedPackageIds),
    packageQuery: '',
    sidebarWidth: DEFAULT_PACKAGE_SIDEBAR_WIDTH,
    includeNested: defaults.includeNested,
    sortAscending: defaults.sortAscending,
    typeFilter: defaults.typeFilter,
    currentPage: 1,
    pageSize: defaults.pageSize,
    selectedDocumentIds: new Set(),
    visibleOptionalColumns: new Set(['version', 'changed']),
    activeDocument: null,
    selectedVersion: null,
    isRefreshing: false,
    createdDocuments: [],
    activeCreationOption: null,
  };

  let tableSnapshot;
  let sidebar;
  let documentsList;
  let detailDrawer;
  let documentPicker;
  let createdDocumentSequence = 0;

  const notify = message => documentsList?.notify(message);

  function deriveTableSnapshot() {
    const selectedPackage = findPackageById(state.packages, state.selectedPackageId);
    const snapshot = createDocumentsTableSnapshot({
      packageId: state.selectedPackageId,
      packageName: selectedPackage?.name ?? 'Документы',
      includeNested: state.includeNested,
      typeFilter: state.typeFilter,
      sortAscending: state.sortAscending,
      currentPage: state.currentPage,
      pageSize: state.pageSize,
      additionalDocuments: state.createdDocuments,
    });
    state.currentPage = snapshot.currentPage;
    return {
      ...snapshot,
      packagePath: getPackageBreadcrumbs(state.packages, state.selectedPackageId),
      selectedDocumentIds: state.selectedDocumentIds,
      visibleOptionalColumns: state.visibleOptionalColumns,
      activeDocumentId: state.activeDocument?.id ?? null,
      isRefreshing: state.isRefreshing,
      canCreate: true,
    };
  }

  function getSidebarSnapshot() {
    const query = state.packageQuery;
    return {
      packages: filterPackageTree(state.packages, query),
      selectedPackageId: state.selectedPackageId,
      expandedIds: state.expandedPackageIds,
      forcedExpandedIds: collectExpandedPackageIds(state.packages, query),
      query,
      width: state.sidebarWidth,
      canCreatePackage: true,
      emptyMessage: 'Пакеты не найдены',
    };
  }

  function getDetailSnapshot() {
    if (!state.activeDocument) return null;
    const selectedPackage = findPackageById(state.packages, state.selectedPackageId);
    const detail = createDocumentDetail(state.activeDocument, {
      packageName: selectedPackage?.name ?? 'Документы',
      selectedVersion: state.selectedVersion,
    });
    state.selectedVersion = detail.selectedVersion;
    return {
      document: detail.document,
      version: detail.selectedVersion,
      versions: detail.versions,
      attributes: detail.attributes,
      files: detail.files,
    };
  }

  function render() {
    tableSnapshot = deriveTableSnapshot();
    sidebar.update(getSidebarSnapshot());
    documentsList.update(tableSnapshot);
    const detailSnapshot = getDetailSnapshot();
    if (detailSnapshot) detailDrawer.update(detailSnapshot);
  }

  function closeDetail() {
    if (!state.activeDocument) return;
    const closedDocumentId = state.activeDocument.id;
    state.activeDocument = null;
    state.selectedVersion = null;
    render();
    window.requestAnimationFrame(() => {
      Array.from(documentsList.element.querySelectorAll('[data-document-trigger]'))
        .find(trigger => trigger.dataset.documentTrigger === closedDocumentId)
        ?.focus();
    });
  }

  const callbacks = {
    setIncludeNested(value) {
      state.includeNested = value;
      state.currentPage = 1;
      state.selectedDocumentIds.clear();
      render();
    },
    setSortAscending(value) {
      state.sortAscending = value;
      render();
    },
    setTypeFilter(value) {
      state.typeFilter = value;
      state.currentPage = 1;
      state.selectedDocumentIds.clear();
      render();
    },
    toggleOptionalColumn(columnId, visible) {
      state.visibleOptionalColumns = updateSetValue(state.visibleOptionalColumns, columnId, visible);
      render();
    },
    refreshDocuments() {
      if (state.isRefreshing) return undefined;
      state.isRefreshing = true;
      render();
      return new Promise(resolve => {
        window.setTimeout(() => {
          state.isRefreshing = false;
          render();
          resolve('Список документов обновлен');
        }, 450);
      });
    },
    runWorkspaceAction(action) {
      const notices = {
        permissions: 'Открыты права доступа пакета',
        'add-to-package': 'Открыт выбор документов для добавления',
        export: 'Выгрузка списка подготовлена',
        'save-view': 'Параметры отображения сохранены',
      };
      return notices[action] ?? 'Действие выполнено';
    },
    onCreateDocument(trigger) {
      documentsList.closeMenus();
      if (state.activeDocument) detailDrawer.close();
      const selectedPackage = findPackageById(state.packages, state.selectedPackageId);
      state.activeCreationOption = null;
      documentPicker.open(trigger, {
        packageId: state.selectedPackageId,
        packageName: selectedPackage?.name ?? 'Документы',
      });
    },
    toggleDocument(documentId) {
      state.selectedDocumentIds = updateSetValue(
        state.selectedDocumentIds,
        documentId,
        !state.selectedDocumentIds.has(documentId),
      );
      render();
    },
    togglePageDocuments(documentIds, selected) {
      let next = new Set(state.selectedDocumentIds);
      documentIds.forEach(documentId => {
        next = updateSetValue(next, documentId, selected);
      });
      state.selectedDocumentIds = next;
      render();
    },
    openDocument(document, trigger) {
      const nextDocument = typeof document === 'string'
        ? tableSnapshot.documents.find(item => item.id === document)
        : document;
      if (!nextDocument) return;
      const wasOpen = Boolean(state.activeDocument);
      state.activeDocument = nextDocument;
      state.selectedVersion = nextDocument.version;
      detailDrawer.update(getDetailSnapshot());
      if (!wasOpen) detailDrawer.open(trigger);
      render();
    },
    runDocumentAction(action, document) {
      if (action === 'open') {
        callbacks.openDocument(document);
        return undefined;
      }
      const notices = {
        download: 'Файл документа подготовлен к скачиванию',
        links: 'Открыты связи документа',
      };
      return notices[action] ?? 'Действие с документом выполнено';
    },
    setCurrentPage(page) {
      state.currentPage = page;
      state.selectedDocumentIds.clear();
      render();
    },
    setPageSize(pageSize) {
      state.pageSize = pageSize;
      state.currentPage = 1;
      state.selectedDocumentIds.clear();
      render();
    },
    clearSelection() {
      state.selectedDocumentIds.clear();
      render();
    },
    runBulkAction(action) {
      return action === 'download'
        ? 'Выбранные документы подготовлены к скачиванию'
        : 'Выбранные документы добавлены в пакет';
    },
  };

  tableSnapshot = deriveTableSnapshot();
  documentsList = createDocumentsList({ snapshot: tableSnapshot, callbacks });
  sidebar = createPackageSidebar({
    ...getSidebarSnapshot(),
    onQueryChange(query) {
      state.packageQuery = query;
      sidebar.update(getSidebarSnapshot());
    },
    onSelectPackage(packageId) {
      state.selectedPackageId = packageId;
      state.currentPage = 1;
      state.selectedDocumentIds.clear();
      if (state.activeDocument) detailDrawer.close();
      else render();
    },
    onTogglePackage(packageId, expanded) {
      state.expandedPackageIds = updateSetValue(state.expandedPackageIds, packageId, expanded);
      sidebar.update(getSidebarSnapshot());
    },
    onCreatePackage({ parentId } = {}) {
      const name = window.prompt('Наименование нового пакета');
      if (!name?.trim()) return;
      const id = `local-package-${Date.now()}`;
      const targetParentId = parentId ?? state.selectedPackageId;
      state.packages = appendPackage(state.packages, targetParentId, { id, name: name.trim() });
      state.expandedPackageIds.add(targetParentId);
      render();
      notify('Пакет создан в локальном прототипе');
    },
    onRenamePackage({ packageId } = {}) {
      const current = findPackageById(state.packages, packageId);
      const name = window.prompt('Новое наименование пакета', current?.name ?? '');
      if (!name?.trim()) return;
      state.packages = renamePackage(state.packages, packageId, name);
      render();
      notify('Наименование пакета изменено');
    },
    onWidthChange(width) {
      state.sidebarWidth = width;
    },
  });

  detailDrawer = createDocumentDetailDrawer({
    onClose: closeDetail,
    onVersionChange(version) {
      state.selectedVersion = version;
      detailDrawer.update(getDetailSnapshot());
    },
    onNotice: notify,
  });

  documentPicker = createNewDocumentTypePickerDrawer({
    options: DOCUMENT_CREATION_OPTIONS,
    onNotice: notify,
    onOptionSelect(option) {
      state.activeCreationOption = option;
      documentPicker.showCreation(option);
    },
    onSubmitDocument({ option, values }) {
      const now = new Date();
      const date = new Intl.DateTimeFormat('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      }).format(now);
      createdDocumentSequence += 1;
      const document = createDocumentFromCreationResult({
        id: `created-document-${now.getTime()}-${createdDocumentSequence}`,
        packageId: state.selectedPackageId,
        option,
        values,
        date,
      });
      if (!document) {
        documentPicker.showError('Не удалось сформировать документ. Проверьте обязательные поля.');
        return;
      }
      state.createdDocuments = [document, ...state.createdDocuments];
      state.activeCreationOption = null;
      state.currentPage = 1;
      documentPicker.close();
      render();
      window.requestAnimationFrame(() => {
        documentsList.element.querySelector('[data-create-document-trigger]')?.focus({ preventScroll: true });
      });
      notify(`Документ «${document.name}» создан в локальном прототипе`);
    },
    onClose() {
      state.activeCreationOption = null;
    },
  });

  element.append(sidebar.element, documentsList.element);

  return {
    element,
    mount() {
      detailDrawer.mount(element);
      documentPicker.mount(element);
    },
    destroy() {
      sidebar.destroy();
      documentsList.destroy();
      documentPicker.destroy();
      detailDrawer.destroy();
      element.remove();
    },
  };
}
