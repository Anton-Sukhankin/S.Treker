import {
  createButton,
  createCheckbox,
  createPagination,
  createSelect,
  createToast,
} from '@s-tracker/ui';
import { ALL_DOCUMENT_TYPES } from '../../data/documents-workspace-mock.js';

const OPTIONAL_COLUMNS = [
  { id: 'version', label: 'Версия' },
  { id: 'changed', label: 'Последнее изменение' },
];
const PAGE_SIZE_OPTIONS = [25, 50, 100];
const SVG_NAMESPACE = 'http://www.w3.org/2000/svg';

let documentsListSequence = 0;

function createElement(tagName, className, text) {
  const element = document.createElement(tagName);
  if (className) element.className = className;
  if (text !== undefined) element.textContent = String(text);
  return element;
}

export function createDocumentsIcon(name, size = 16) {
  const icon = document.createElementNS(SVG_NAMESPACE, 'svg');
  icon.setAttribute('viewBox', '0 0 24 24');
  icon.setAttribute('width', String(size));
  icon.setAttribute('height', String(size));
  icon.setAttribute('fill', 'none');
  icon.setAttribute('stroke', 'currentColor');
  icon.setAttribute('stroke-width', '2');
  icon.setAttribute('stroke-linecap', 'round');
  icon.setAttribute('stroke-linejoin', 'round');
  icon.setAttribute('aria-hidden', 'true');
  icon.classList.add('documents-icon');

  const definitions = {
    check: [['path', { d: 'm5 12 4 4L19 6' }]],
    chevronRight: [['path', { d: 'm9 18 6-6-6-6' }]],
    download: [
      ['path', { d: 'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4' }],
      ['path', { d: 'm7 10 5 5 5-5' }],
      ['path', { d: 'M12 15V3' }],
    ],
    file: [
      ['path', { d: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z' }],
      ['path', { d: 'M14 2v6h6' }],
    ],
    filePlus: [
      ['path', { d: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z' }],
      ['path', { d: 'M14 2v6h6' }],
      ['path', { d: 'M12 18v-6' }],
      ['path', { d: 'M9 15h6' }],
    ],
    filter: [
      ['path', { d: 'M22 3H2l8 9.46V19l4 2v-8.54Z' }],
    ],
    folder: [
      ['path', { d: 'M3 5a2 2 0 0 1 2-2h5l2 3h7a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z' }],
    ],
    folderInput: [
      ['path', { d: 'M2 7.5V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-9' }],
      ['path', { d: 'm6 10-4 4 4 4' }],
      ['path', { d: 'M2 14h10' }],
    ],
    layers: [
      ['path', { d: 'm12.83 2.18 8 4a2 2 0 0 1 0 3.58l-8 4a2 2 0 0 1-1.66 0l-8-4a2 2 0 0 1 0-3.58l8-4a2 2 0 0 1 1.66 0Z' }],
      ['path', { d: 'm22 12.5-9.17 4.59a2 2 0 0 1-1.66 0L2 12.5' }],
      ['path', { d: 'm22 17.5-9.17 4.59a2 2 0 0 1-1.66 0L2 17.5' }],
    ],
    more: [
      ['circle', { cx: '12', cy: '5', r: '1' }],
      ['circle', { cx: '12', cy: '12', r: '1' }],
      ['circle', { cx: '12', cy: '19', r: '1' }],
    ],
    refresh: [
      ['path', { d: 'M20 11a8.1 8.1 0 0 0-15.5-2M4 4v5h5' }],
      ['path', { d: 'M4 13a8.1 8.1 0 0 0 15.5 2M20 20v-5h-5' }],
    ],
    search: [
      ['circle', { cx: '11', cy: '11', r: '8' }],
      ['path', { d: 'm21 21-4.3-4.3' }],
    ],
    settings: [
      ['circle', { cx: '12', cy: '12', r: '3' }],
      ['path', { d: 'M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-2.83 2.83-.06-.06A1.7 1.7 0 0 0 15 19.4a1.7 1.7 0 0 0-1 .6 1.7 1.7 0 0 0-.4 1.1V21h-4v-.09A1.7 1.7 0 0 0 8.6 19.4a1.7 1.7 0 0 0-1.88.34l-.06.06-2.83-2.83.06-.06A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-.6-1 1.7 1.7 0 0 0-1.1-.4H3v-4h.09A1.7 1.7 0 0 0 4.6 8.6a1.7 1.7 0 0 0-.34-1.88l-.06-.06 2.83-2.83.06.06A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-.6 1.7 1.7 0 0 0 .4-1.1V3h4v.09A1.7 1.7 0 0 0 15.4 4.6a1.7 1.7 0 0 0 1.88-.34l.06-.06 2.83 2.83-.06.06A1.7 1.7 0 0 0 19.4 9c.38.26.73.6 1 .98.24.33.38.73.4 1.13V11h.2v4h-.09a1.7 1.7 0 0 0-1.51 1Z' }],
    ],
    shield: [
      ['path', { d: 'M20 13c0 5-3.5 7.5-8 9-4.5-1.5-8-4-8-9V5l8-3 8 3Z' }],
      ['path', { d: 'm9 12 2 2 4-4' }],
    ],
    sliders: [
      ['path', { d: 'M4 21v-7' }],
      ['path', { d: 'M4 10V3' }],
      ['path', { d: 'M12 21v-9' }],
      ['path', { d: 'M12 8V3' }],
      ['path', { d: 'M20 21v-5' }],
      ['path', { d: 'M20 12V3' }],
      ['path', { d: 'M1 14h6' }],
      ['path', { d: 'M9 8h6' }],
      ['path', { d: 'M17 16h6' }],
    ],
    sortAsc: [
      ['path', { d: 'M3 8l3-3 3 3' }],
      ['path', { d: 'M6 5v14' }],
      ['path', { d: 'M13 7h8' }],
      ['path', { d: 'M13 12h6' }],
      ['path', { d: 'M13 17h4' }],
    ],
    sortDesc: [
      ['path', { d: 'm3 16 3 3 3-3' }],
      ['path', { d: 'M6 19V5' }],
      ['path', { d: 'M13 7h4' }],
      ['path', { d: 'M13 12h6' }],
      ['path', { d: 'M13 17h8' }],
    ],
    x: [
      ['path', { d: 'M18 6 6 18' }],
      ['path', { d: 'm6 6 12 12' }],
    ],
  };

  (definitions[name] || definitions.file).forEach(([tagName, attributes]) => {
    const child = document.createElementNS(SVG_NAMESPACE, tagName);
    Object.entries(attributes).forEach(([attribute, value]) => child.setAttribute(attribute, value));
    icon.append(child);
  });
  return icon;
}

const createIcon = createDocumentsIcon;

function toSet(value) {
  if (value instanceof Set) return value;
  return new Set(Array.isArray(value) ? value : []);
}

function normalizePath(snapshot) {
  const path = snapshot.packagePath || snapshot.packageBreadcrumbs || [];
  return path
    .map((segment, index) => typeof segment === 'string'
      ? { id: segment, name: segment, index }
      : { id: segment.id, name: segment.name || segment.label || '', index })
    .filter(segment => segment.name && segment.name !== '.');
}

function normalizeSnapshot(snapshot = {}) {
  const documents = snapshot.pageDocuments || snapshot.documents || [];
  const pageSize = Number(snapshot.pageSize) || 25;
  const totalCount = Number(snapshot.totalCount ?? snapshot.filteredCount ?? documents.length) || 0;
  const totalPages = Math.max(1, Number(snapshot.totalPages) || Math.ceil(totalCount / pageSize) || 1);
  const currentPage = Math.min(totalPages, Math.max(1, Number(snapshot.currentPage) || 1));
  const pageStart = Number.isFinite(snapshot.pageStart)
    ? Number(snapshot.pageStart)
    : (currentPage - 1) * pageSize;

  return {
    activeDocumentId: snapshot.activeDocumentId || snapshot.openDocumentId || null,
    canCreate: snapshot.canCreate !== false,
    currentPage,
    documents,
    includeNested: Boolean(snapshot.includeNested),
    isRefreshing: Boolean(snapshot.isRefreshing),
    packageId: snapshot.packageId || snapshot.selectedPackageId || null,
    packagePath: normalizePath(snapshot),
    pageSize,
    pageStart,
    selectedDocumentIds: toSet(snapshot.selectedDocumentIds),
    sortAscending: snapshot.sortAscending !== false,
    totalCount,
    totalPages,
    typeFilter: snapshot.typeFilter || ALL_DOCUMENT_TYPES,
    typeOptions: Array.from(new Set([ALL_DOCUMENT_TYPES, ...(snapshot.typeOptions || snapshot.documentTypes || [])])),
    visibleOptionalColumns: toSet(snapshot.visibleOptionalColumns || OPTIONAL_COLUMNS.map(column => column.id)),
  };
}

function formatDocumentCount(count) {
  const normalized = Math.abs(Number(count)) % 100;
  const lastDigit = normalized % 10;
  if (normalized > 10 && normalized < 20) return `${count} документов`;
  if (lastDigit === 1) return `${count} документ`;
  if (lastDigit > 1 && lastDigit < 5) return `${count} документа`;
  return `${count} документов`;
}

function createMenuButton({ label, icon, onClick, selected = false }) {
  const button = createButton({
    label,
    icon: icon ? createIcon(icon, 15) : undefined,
    variant: 'text',
    size: 'small',
    className: selected ? 'is-selected' : '',
    attributes: { role: 'menuitem' },
    onClick,
  });
  return button;
}

/**
 * Renders the package context, toolbar, document table, pagination and bulk actions.
 * Product state and derived document data remain owned by the workspace. This module
 * only owns transient menu/toast state and reports user intent through callbacks.
 */
export function createDocumentsList({ snapshot = {}, callbacks = {} } = {}) {
  const instanceId = `documents-list-${++documentsListSequence}`;
  const element = createElement('section', 'documents-workspace');
  element.setAttribute('aria-label', 'Документы выбранного пакета');
  element.dataset.documentsList = instanceId;

  const toast = createToast({ duration: 2400 });
  toast.element.classList.add('documents-toast');

  let currentSnapshot = normalizeSnapshot(snapshot);
  let currentCallbacks = callbacks;
  let openWorkspaceMenu = null;
  let openRowMenuId = null;
  let lastMenuTrigger = null;
  let outsideCloseTimer = null;
  let destroyed = false;

  const closeMenus = ({ restoreFocus = false } = {}) => {
    if (!openWorkspaceMenu && !openRowMenuId) return false;
    const focusKey = restoreFocus ? lastMenuTrigger : null;
    openWorkspaceMenu = null;
    openRowMenuId = null;
    render();
    if (focusKey) {
      Array.from(element.querySelectorAll('[data-menu-trigger]'))
        .find(trigger => trigger.dataset.menuTrigger === focusKey)
        ?.focus();
    }
    return true;
  };

  const showNotice = message => {
    if (destroyed || !message) return;
    toast.show({ message });
  };

  const runCallback = (callback, args, fallbackMessage) => {
    let result;
    try {
      result = callback?.(...args);
    } catch (error) {
      window.setTimeout(() => { throw error; });
      return;
    }

    if (result && typeof result.then === 'function') {
      result.then(message => showNotice(typeof message === 'string' ? message : fallbackMessage)).catch(() => {});
      return;
    }
    showNotice(typeof result === 'string' ? result : fallbackMessage);
  };

  const createContextBar = state => {
    const header = createElement('header', 'documents-context-bar');
    const breadcrumbs = createElement('nav', 'package-breadcrumbs');
    breadcrumbs.setAttribute('aria-label', 'Путь выбранного пакета');
    breadcrumbs.append(createElement('span', 'breadcrumbs-root', 'Документы'));

    state.packagePath.forEach((segment, index) => {
      const item = createElement('span', 'breadcrumb-segment');
      item.append(createIcon('chevronRight', 14));
      const isCurrent = index === state.packagePath.length - 1;
      const label = createElement('span', isCurrent ? 'is-current' : '', segment.name);
      if (isCurrent) label.setAttribute('aria-current', 'page');
      item.append(label);
      breadcrumbs.append(item);
    });

    const count = createElement('span', 'documents-count', formatDocumentCount(state.totalCount));
    count.setAttribute('aria-live', 'polite');
    header.append(breadcrumbs, count);
    return header;
  };

  const toggleWorkspaceMenu = (menuName, triggerKey) => {
    openWorkspaceMenu = openWorkspaceMenu === menuName ? null : menuName;
    openRowMenuId = null;
    lastMenuTrigger = triggerKey;
    render();
    if (openWorkspaceMenu) {
      element.querySelector(`[data-menu-owner="${menuName}"] [role="menuitem"], [data-menu-owner="${menuName}"] input`)?.focus();
    }
  };

  const createFilterMenu = state => {
    const popover = createElement('div', 'workspace-popover filter-popover');
    popover.dataset.menuOwner = 'filter';
    popover.setAttribute('role', 'menu');
    popover.setAttribute('aria-label', 'Фильтр документов по типу');
    popover.append(createElement('div', 'workspace-popover-title', 'Тип документа'));

    state.typeOptions.forEach(type => {
      const button = createMenuButton({
        label: type,
        selected: state.typeFilter === type,
        onClick: () => {
          closeMenus();
          currentCallbacks.setTypeFilter?.(type);
        },
      });
      if (state.typeFilter === type) button.append(createIcon('check', 15));
      popover.append(button);
    });
    return popover;
  };

  const createColumnsMenu = state => {
    const popover = createElement('div', 'workspace-popover settings-popover');
    popover.dataset.menuOwner = 'settings';
    popover.setAttribute('role', 'group');
    popover.setAttribute('aria-label', 'Настройки колонок таблицы');
    popover.append(createElement('div', 'workspace-popover-title', 'Колонки таблицы'));

    ['Наименование', 'Номер', 'Тип документа'].forEach((label, index) => {
      const checkbox = createCheckbox({
        id: `${instanceId}-required-column-${index}`,
        label,
        checked: true,
        disabled: true,
      });
      popover.append(checkbox.element);
    });

    OPTIONAL_COLUMNS.forEach(column => {
      const checkbox = createCheckbox({
        id: `${instanceId}-optional-column-${column.id}`,
        label: column.label,
        checked: state.visibleOptionalColumns.has(column.id),
        onChange: checked => currentCallbacks.toggleOptionalColumn?.(column.id, checked),
      });
      popover.append(checkbox.element);
    });
    return popover;
  };

  const createListActionsMenu = () => {
    const popover = createElement('div', 'workspace-popover list-actions-popover');
    popover.dataset.menuOwner = 'more';
    popover.setAttribute('role', 'menu');
    popover.setAttribute('aria-label', 'Дополнительные действия списка');
    popover.append(
      createMenuButton({
        label: 'Выгрузить список',
        icon: 'download',
        onClick: () => {
          closeMenus();
          runCallback(currentCallbacks.runWorkspaceAction, ['export'], 'Выгрузка списка подготовлена');
        },
      }),
      createMenuButton({
        label: 'Сохранить представление',
        icon: 'sliders',
        onClick: () => {
          closeMenus();
          runCallback(currentCallbacks.runWorkspaceAction, ['save-view'], 'Параметры отображения сохранены');
        },
      }),
    );
    return popover;
  };

  const createToolbar = state => {
    const toolbar = createElement('div', 'documents-toolbar');
    const left = createElement('div', 'documents-toolbar-left');
    const right = createElement('div', 'documents-toolbar-right');

    const filterAnchor = createElement('div', 'workspace-menu-anchor');
    const filterTriggerKey = `${instanceId}-filter`;
    const filterButton = createButton({
      label: 'Фильтры',
      icon: createIcon('filter', 16),
      variant: 'outlined',
      size: 'small',
      className: `toolbar-button${state.typeFilter !== ALL_DOCUMENT_TYPES ? ' is-active' : ''}`,
      attributes: {
        'aria-expanded': String(openWorkspaceMenu === 'filter'),
        'aria-haspopup': 'menu',
        'data-menu-trigger': filterTriggerKey,
      },
      onClick: () => toggleWorkspaceMenu('filter', filterTriggerKey),
    });
    if (state.typeFilter !== ALL_DOCUMENT_TYPES) filterButton.append(createElement('span', 'filter-count', '1'));
    filterAnchor.append(filterButton);
    if (openWorkspaceMenu === 'filter') filterAnchor.append(createFilterMenu(state));

    const sortButton = createButton({
      icon: createIcon(state.sortAscending ? 'sortAsc' : 'sortDesc', 17),
      iconOnly: true,
      ariaLabel: state.sortAscending
        ? 'Сортировка по наименованию: по возрастанию'
        : 'Сортировка по наименованию: по убыванию',
      variant: 'text',
      size: 'small',
      className: 'icon-toolbar-button',
      attributes: { title: state.sortAscending ? 'По возрастанию' : 'По убыванию' },
      onClick: () => currentCallbacks.setSortAscending?.(!state.sortAscending),
    });

    const settingsAnchor = createElement('div', 'workspace-menu-anchor');
    const settingsTriggerKey = `${instanceId}-settings`;
    const settingsButton = createButton({
      icon: createIcon('settings', 17),
      iconOnly: true,
      ariaLabel: 'Настройки колонок',
      variant: 'text',
      size: 'small',
      className: 'icon-toolbar-button',
      attributes: {
        'aria-expanded': String(openWorkspaceMenu === 'settings'),
        'aria-haspopup': 'true',
        'data-menu-trigger': settingsTriggerKey,
      },
      onClick: () => toggleWorkspaceMenu('settings', settingsTriggerKey),
    });
    settingsAnchor.append(settingsButton);
    if (openWorkspaceMenu === 'settings') settingsAnchor.append(createColumnsMenu(state));

    const moreAnchor = createElement('div', 'workspace-menu-anchor');
    const moreTriggerKey = `${instanceId}-more`;
    const moreButton = createButton({
      icon: createIcon('more', 17),
      iconOnly: true,
      ariaLabel: 'Дополнительные действия списка',
      variant: 'text',
      size: 'small',
      className: 'icon-toolbar-button',
      attributes: {
        'aria-expanded': String(openWorkspaceMenu === 'more'),
        'aria-haspopup': 'menu',
        'data-menu-trigger': moreTriggerKey,
      },
      onClick: () => toggleWorkspaceMenu('more', moreTriggerKey),
    });
    moreAnchor.append(moreButton);
    if (openWorkspaceMenu === 'more') moreAnchor.append(createListActionsMenu());

    const includeNested = createCheckbox({
      id: `${instanceId}-include-nested`,
      label: 'Включая вложенные',
      checked: state.includeNested,
      onChange: checked => currentCallbacks.setIncludeNested?.(checked),
    });
    includeNested.element.classList.add('nested-documents-toggle');
    const toggleTrack = includeNested.element.querySelector('.ds-checkbox__box');
    toggleTrack?.classList.add('toggle-track');
    toggleTrack?.append(createElement('span'));

    left.append(filterAnchor, sortButton, settingsAnchor, moreAnchor, includeNested.element);

    right.append(
      createButton({
        icon: createIcon('refresh', 17),
        iconOnly: true,
        ariaLabel: 'Обновить список документов',
        disabled: state.isRefreshing,
        variant: 'text',
        size: 'small',
        className: `icon-toolbar-button${state.isRefreshing ? ' is-refreshing' : ''}`,
        onClick: () => runCallback(currentCallbacks.refreshDocuments, [], 'Список документов обновлен'),
      }),
      createButton({
        label: 'Права доступа',
        icon: createIcon('shield', 16),
        variant: 'outlined',
        size: 'small',
        className: 'toolbar-button toolbar-button-secondary',
        onClick: () => runCallback(currentCallbacks.runWorkspaceAction, ['permissions'], 'Открыты права доступа пакета'),
      }),
      createButton({
        label: 'Добавить в пакет',
        icon: createIcon('folderInput', 16),
        variant: 'outlined',
        size: 'small',
        className: 'toolbar-button toolbar-button-secondary',
        onClick: () => runCallback(currentCallbacks.runWorkspaceAction, ['add-to-package'], 'Открыт выбор документов для добавления'),
      }),
      createButton({
        label: 'Создать новый документ',
        icon: createIcon('filePlus', 16),
        variant: 'primary',
        size: 'small',
        className: 'toolbar-button toolbar-button-primary',
        disabled: !state.canCreate,
        attributes: { 'data-create-document-trigger': 'true' },
        onClick: event => currentCallbacks.onCreateDocument?.(event.currentTarget),
      }),
    );

    toolbar.append(left, right);
    return toolbar;
  };

  const createSelectionCheckbox = ({ id, label, checked, indeterminate = false, onChange }) => {
    const checkbox = createCheckbox({ id, label: '', checked, indeterminate, onChange });
    checkbox.element.classList.add('document-selection-checkbox');
    checkbox.input.setAttribute('aria-label', label);
    return checkbox.element;
  };

  const createRowMenu = documentRow => {
    const menu = createElement('div', 'document-row-menu');
    menu.setAttribute('role', 'menu');
    menu.setAttribute('aria-label', `Действия документа «${documentRow.name}»`);
    menu.dataset.menuOwner = 'row';
    menu.addEventListener('click', event => event.stopPropagation());
    menu.append(
      createMenuButton({
        label: 'Открыть карточку',
        onClick: event => {
          closeMenus();
          currentCallbacks.openDocument?.(documentRow, event.currentTarget);
        },
      }),
      createMenuButton({
        label: 'Скачать',
        onClick: () => {
          closeMenus();
          runCallback(currentCallbacks.runDocumentAction, ['download', documentRow], 'Файл документа подготовлен к скачиванию');
        },
      }),
      createMenuButton({
        label: 'Показать связи',
        onClick: () => {
          closeMenus();
          runCallback(currentCallbacks.runDocumentAction, ['show-links', documentRow], 'Открыты связи документа');
        },
      }),
    );
    return menu;
  };

  const createDocumentRow = (documentRow, state) => {
    const isSelected = state.selectedDocumentIds.has(documentRow.id);
    const isDetailActive = state.activeDocumentId === documentRow.id;
    const row = createElement('tr', [isSelected ? 'is-selected' : '', isDetailActive ? 'is-detail-active' : ''].filter(Boolean).join(' '));
    row.dataset.documentId = documentRow.id;
    row.addEventListener('click', () => currentCallbacks.toggleDocument?.(documentRow.id));

    const selectionCell = createElement('td', 'document-selection-column');
    const rowCheckbox = createSelectionCheckbox({
      id: `${instanceId}-document-${documentRow.id}`,
      label: `Выбрать документ «${documentRow.name}»`,
      checked: isSelected,
      onChange: () => currentCallbacks.toggleDocument?.(documentRow.id),
    });
    rowCheckbox.addEventListener('click', event => event.stopPropagation());
    selectionCell.append(rowCheckbox);

    const nameCell = createElement('td', 'document-name-column');
    const nameButton = createButton({
      label: documentRow.name,
      icon: createIcon('file', 16),
      variant: 'text',
      size: 'small',
      className: 'document-name-button',
      attributes: {
        title: documentRow.name,
        'data-document-trigger': documentRow.id,
      },
      onClick: event => {
        event.stopPropagation();
        currentCallbacks.openDocument?.(documentRow, event.currentTarget);
      },
    });
    nameCell.append(nameButton);

    const actionsCell = createElement('td', 'document-actions-column');
    const menuAnchor = createElement('div', 'document-row-menu-anchor');
    const rowTriggerKey = `${instanceId}-row-${encodeURIComponent(String(documentRow.id))}`;
    const rowMenuButton = createButton({
      icon: createIcon('more', 17),
      iconOnly: true,
      ariaLabel: `Действия документа «${documentRow.name}»`,
      variant: 'text',
      size: 'small',
      className: 'document-row-menu-button',
      attributes: {
        'aria-expanded': String(openRowMenuId === documentRow.id),
        'aria-haspopup': 'menu',
        'data-menu-trigger': rowTriggerKey,
      },
      onClick: event => {
        event.stopPropagation();
        openRowMenuId = openRowMenuId === documentRow.id ? null : documentRow.id;
        openWorkspaceMenu = null;
        lastMenuTrigger = rowTriggerKey;
        render();
        if (openRowMenuId) element.querySelector('[data-menu-owner="row"] [role="menuitem"]')?.focus();
      },
    });
    menuAnchor.append(rowMenuButton);
    if (openRowMenuId === documentRow.id) menuAnchor.append(createRowMenu(documentRow));
    actionsCell.append(menuAnchor);

    row.append(
      selectionCell,
      nameCell,
      createElement('td', '', documentRow.number || '—'),
      createElement('td', '', documentRow.type || '—'),
      createElement('td', '', documentRow.date || '—'),
    );
    if (state.visibleOptionalColumns.has('version')) row.append(createElement('td', 'document-version-column', documentRow.version ?? '—'));
    if (state.visibleOptionalColumns.has('changed')) row.append(createElement('td', '', documentRow.changed || '—'));
    row.append(actionsCell);
    return row;
  };

  const createEmptyRow = state => {
    const row = createElement('tr', 'documents-empty-row');
    const cell = createElement('td');
    const columnCount = 6 + OPTIONAL_COLUMNS.filter(column => state.visibleOptionalColumns.has(column.id)).length;
    cell.colSpan = columnCount;
    cell.append(createIcon('folder', 24));

    if (!state.packageId && state.packagePath.length === 0) {
      cell.append(createElement('strong', '', 'Выберите пакет, чтобы увидеть документы'));
    } else if (state.typeFilter !== ALL_DOCUMENT_TYPES) {
      cell.append(createElement('strong', '', 'В пакете нет документов выбранного типа'));
      cell.append(createButton({
        label: 'Сбросить фильтр',
        variant: 'text',
        size: 'small',
        onClick: () => currentCallbacks.setTypeFilter?.(ALL_DOCUMENT_TYPES),
      }));
    } else {
      cell.append(createElement('strong', '', 'В пакете пока нет документов'));
    }
    row.append(cell);
    return row;
  };

  const createDocumentsTable = state => {
    const scroll = createElement('div', 'documents-table-scroll');
    const table = createElement('table', 'documents-table');
    const head = document.createElement('thead');
    const headRow = document.createElement('tr');
    const body = document.createElement('tbody');

    const pageIds = state.documents.map(documentRow => documentRow.id);
    const selectedPageCount = pageIds.filter(id => state.selectedDocumentIds.has(id)).length;
    const allPageSelected = pageIds.length > 0 && selectedPageCount === pageIds.length;
    const selectionHeading = createElement('th', 'document-selection-column');
    selectionHeading.scope = 'col';
    selectionHeading.append(createSelectionCheckbox({
      id: `${instanceId}-select-page`,
      label: 'Выбрать все документы на странице',
      checked: allPageSelected,
      indeterminate: selectedPageCount > 0 && !allPageSelected,
      onChange: () => currentCallbacks.togglePageDocuments?.(pageIds, !allPageSelected),
    }));

    const headings = [
      [selectionHeading],
      ['Наименование', 'document-name-column'],
      ['Номер', ''],
      ['Тип документа', ''],
      ['Дата документа', ''],
    ];
    headings.forEach(([heading, className]) => {
      if (heading instanceof HTMLElement) {
        headRow.append(heading);
        return;
      }
      const cell = createElement('th', className, heading);
      cell.scope = 'col';
      headRow.append(cell);
    });
    if (state.visibleOptionalColumns.has('version')) {
      const version = createElement('th', 'document-version-column', 'Версия');
      version.scope = 'col';
      headRow.append(version);
    }
    if (state.visibleOptionalColumns.has('changed')) {
      const changed = createElement('th', '', 'Последнее изменение');
      changed.scope = 'col';
      headRow.append(changed);
    }
    const actions = createElement('th', 'document-actions-column');
    actions.scope = 'col';
    actions.append(createElement('span', 'sr-only', 'Действия'));
    headRow.append(actions);

    head.append(headRow);
    if (state.documents.length) {
      state.documents.forEach(documentRow => body.append(createDocumentRow(documentRow, state)));
    } else {
      body.append(createEmptyRow(state));
    }
    table.append(head, body);
    scroll.append(table);
    return scroll;
  };

  const createPaginationBar = state => {
    const footer = createElement('footer', 'documents-pagination-bar');
    const rangeEnd = Math.min(state.pageStart + state.documents.length, state.totalCount);
    const summaryText = state.totalCount
      ? `${state.pageStart + 1}–${rangeEnd} из ${state.totalCount}`
      : '0 документов';
    const summary = createElement('div', 'pagination-summary', summaryText);
    summary.setAttribute('aria-live', 'polite');

    const paginationSlot = createElement('div', 'documents-pagination-slot');
    if (state.totalCount > state.pageSize && state.totalPages > 1) {
      // The shared Pagination captures totalPages at creation time. Recreating only
      // this slot on snapshot updates safely keeps it in sync without a local copy.
      const pagination = createPagination({
        currentPage: state.currentPage,
        totalPages: state.totalPages,
        label: 'Страницы документов пакета',
        onChange: page => currentCallbacks.setCurrentPage?.(page),
      });
      pagination.element.classList.add('documents-pagination');
      paginationSlot.append(pagination.element);
    }

    const pageSizeSelect = createSelect({
      id: `${instanceId}-page-size`,
      label: 'Показывать по',
      options: PAGE_SIZE_OPTIONS.map(size => ({ value: String(size), label: String(size) })),
      value: String(state.pageSize),
      attributes: { 'aria-label': 'Количество документов на странице' },
      onChange: value => currentCallbacks.setPageSize?.(Number(value)),
    });
    pageSizeSelect.element.classList.add('page-size-control');
    footer.append(summary, paginationSlot, pageSizeSelect.element);
    return footer;
  };

  const createSelectionBar = state => {
    if (state.selectedDocumentIds.size === 0) return null;
    const bar = createElement('div', 'documents-selection-bar');
    bar.setAttribute('role', 'status');
    bar.setAttribute('aria-live', 'polite');
    const ids = Array.from(state.selectedDocumentIds);
    bar.append(
      createElement('span', '', `Выбрано: ${ids.length}`),
      createButton({
        label: 'Добавить в пакет',
        icon: createIcon('folderInput', 15),
        variant: 'text',
        size: 'small',
        onClick: () => runCallback(currentCallbacks.runBulkAction, ['add-to-package', ids], 'Выбранные документы добавлены в пакет'),
      }),
      createButton({
        label: 'Скачать',
        icon: createIcon('download', 15),
        variant: 'text',
        size: 'small',
        onClick: () => runCallback(currentCallbacks.runBulkAction, ['download', ids], 'Выбранные документы подготовлены к скачиванию'),
      }),
      createButton({
        icon: createIcon('x', 15),
        iconOnly: true,
        ariaLabel: 'Снять выделение',
        variant: 'text',
        size: 'small',
        className: 'selection-clear',
        onClick: () => currentCallbacks.clearSelection?.(),
      }),
    );
    return bar;
  };

  function render() {
    if (destroyed) return;
    if (openRowMenuId && !currentSnapshot.documents.some(documentRow => documentRow.id === openRowMenuId)) {
      openRowMenuId = null;
    }
    element.replaceChildren(
      createContextBar(currentSnapshot),
      createToolbar(currentSnapshot),
      createDocumentsTable(currentSnapshot),
      createPaginationBar(currentSnapshot),
    );
    const selectionBar = createSelectionBar(currentSnapshot);
    if (selectionBar) element.append(selectionBar);
    element.append(toast.element);
  }

  const handleDocumentPointerDown = event => {
    if (!openWorkspaceMenu && !openRowMenuId) return;
    if (
      element.contains(event.target)
      && event.target instanceof Element
      && event.target.closest('.workspace-menu-anchor, .document-row-menu-anchor')
    ) return;
    window.clearTimeout(outsideCloseTimer);
    outsideCloseTimer = window.setTimeout(() => {
      outsideCloseTimer = null;
      closeMenus();
    }, 0);
  };

  const handleDocumentKeyDown = event => {
    if (event.key !== 'Escape') return;
    if (closeMenus({ restoreFocus: true })) event.stopPropagation();
  };

  document.addEventListener('pointerdown', handleDocumentPointerDown);
  document.addEventListener('keydown', handleDocumentKeyDown);
  render();

  return {
    element,
    update(nextSnapshot = {}, nextCallbacks) {
      currentSnapshot = normalizeSnapshot(nextSnapshot);
      if (nextCallbacks) currentCallbacks = nextCallbacks;
      render();
    },
    notify(message) {
      showNotice(message);
    },
    closeMenus,
    destroy() {
      if (destroyed) return;
      destroyed = true;
      window.clearTimeout(outsideCloseTimer);
      toast.hide();
      document.removeEventListener('pointerdown', handleDocumentPointerDown);
      document.removeEventListener('keydown', handleDocumentKeyDown);
      element.replaceChildren();
    },
  };
}
