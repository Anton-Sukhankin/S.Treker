import { createButton, createDrawer, createSelect } from '@s-tracker/ui';

export const DEFAULT_DOCUMENT_DETAIL_WIDTH = 1060;
export const MIN_DOCUMENT_DETAIL_WIDTH = 840;

const MIN_VISIBLE_WORKSPACE_WIDTH = 440;
const RESIZE_STEP = 16;
const RESIZE_LARGE_STEP = 40;

function getDocumentDetailWidthBounds() {
  const viewportWidth = Math.max(0, window.innerWidth || document.documentElement.clientWidth || 1440);
  const viewportSafeWidth = Math.max(0, viewportWidth - 64);
  const responsiveWidth = Math.min(
    Math.max(320, viewportWidth - MIN_VISIBLE_WORKSPACE_WIDTH),
    viewportSafeWidth,
  );
  const minimum = Math.min(MIN_DOCUMENT_DETAIL_WIDTH, responsiveWidth);
  return {
    min: minimum,
    max: Math.max(minimum, responsiveWidth),
  };
}

function clampDocumentDetailWidth(value) {
  const { min, max } = getDocumentDetailWidthBounds();
  const numericValue = Number(value);
  const safeValue = Number.isFinite(numericValue) ? numericValue : DEFAULT_DOCUMENT_DETAIL_WIDTH;
  return Math.min(max, Math.max(min, Math.round(safeValue)));
}

function createIcon(name, size = 16) {
  const icon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  icon.setAttribute('viewBox', '0 0 24 24');
  icon.setAttribute('width', String(size));
  icon.setAttribute('height', String(size));
  icon.setAttribute('fill', 'none');
  icon.setAttribute('stroke', 'currentColor');
  icon.setAttribute('stroke-width', '2');
  icon.setAttribute('stroke-linecap', 'round');
  icon.setAttribute('stroke-linejoin', 'round');
  icon.setAttribute('aria-hidden', 'true');

  const paths = {
    archive: ['M3 6h18', 'M5 6v14h14V6', 'M9 10h6'],
    chevron: ['m9 18 6-6-6-6'],
    copy: ['M8 8h11v11H8z', 'M5 16H4V5h11v1'],
    download: ['M12 3v12', 'm7 10 5 5 5-5', 'M5 21h14'],
    edit: ['M12 20h9', 'M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z'],
    external: ['M14 3h7v7', 'm10 14 11-11', 'M21 14v6a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h6'],
    file: ['M6 2h8l4 4v16H6z', 'M14 2v5h5'],
    folder: ['M3 6h7l2 2h9v11H3z'],
    link: ['M10 13a5 5 0 0 0 7.1.1l2-2a5 5 0 0 0-7.1-7.1l-1.1 1.1', 'M14 11a5 5 0 0 0-7.1-.1l-2 2A5 5 0 0 0 12 20l1.1-1.1'],
    play: ['M5 3l14 9-14 9z'],
    plusFile: ['M6 2h8l4 4v16H6z', 'M14 2v5h5', 'M9 14h6', 'M12 11v6'],
    settingsFile: ['M6 2h8l4 4v16H6z', 'M14 2v5h5', 'M9 14h6', 'M12 11v6'],
    trash: ['M4 7h16', 'M9 7V4h6v3', 'M7 7l1 14h8l1-14'],
    resize: ['M4 12h16', 'm8 8-4 4 4 4', 'm16 8 4 4-4 4'],
    x: ['M6 6l12 12', 'M18 6 6 18'],
  };

  (paths[name] || paths.file).forEach(pathData => {
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', pathData);
    icon.append(path);
  });
  return icon;
}

function createActionItem({ label, icon, notice, destructive = false }, onRun) {
  return createButton({
    label,
    icon: createIcon(icon),
    variant: 'text',
    size: 'small',
    className: destructive ? 'is-destructive' : '',
    attributes: { role: 'menuitem' },
    onClick: () => onRun(notice),
  });
}

function replaceOptions(select, versions, selectedVersion) {
  select.replaceChildren();
  versions.forEach(version => {
    const option = document.createElement('option');
    option.value = String(version.value ?? version.number);
    option.textContent = version.label;
    select.append(option);
  });
  select.value = String(selectedVersion ?? versions[0]?.value ?? '');
}

export function createDocumentDetailDrawer({ onClose, onVersionChange, onNotice } = {}) {
  const body = document.createElement('div');
  body.className = 'document-detail-content';

  const attributesPanel = document.createElement('section');
  attributesPanel.className = 'document-attributes-panel';
  attributesPanel.setAttribute('aria-labelledby', 'document-attributes-title');
  const attributesHeading = document.createElement('div');
  attributesHeading.className = 'detail-panel-heading';
  const attributesTitle = document.createElement('h2');
  attributesTitle.id = 'document-attributes-title';
  attributesTitle.textContent = 'Атрибуты';
  const attributesCount = document.createElement('span');
  attributesCount.className = 'detail-panel-count';
  const attributesGrid = document.createElement('div');
  attributesGrid.className = 'document-attributes-grid';
  attributesHeading.append(attributesTitle, attributesCount);
  attributesPanel.append(attributesHeading, attributesGrid);

  const filesPanel = document.createElement('aside');
  filesPanel.className = 'document-files-panel';
  filesPanel.setAttribute('aria-labelledby', 'document-files-title');
  const filesHeading = document.createElement('div');
  filesHeading.className = 'detail-panel-heading files-heading';
  const filesTitle = document.createElement('h2');
  filesTitle.id = 'document-files-title';
  filesTitle.textContent = 'Файлы';
  const filesCount = document.createElement('span');
  filesCount.className = 'detail-panel-count';
  const filesList = document.createElement('div');
  filesList.className = 'document-files-list';
  filesHeading.append(filesTitle, filesCount);
  filesPanel.append(filesHeading, filesList);
  body.append(attributesPanel, filesPanel);

  const footer = document.createElement('div');
  footer.className = 'document-detail-footer-actions';
  const footerClose = createButton({
    label: 'Закрыть',
    variant: 'outlined',
    size: 'small',
    className: 'detail-footer-secondary',
  });
  const editAttributes = createButton({
    label: 'Редактировать атрибуты',
    icon: createIcon('edit', 15),
    variant: 'primary',
    size: 'small',
    className: 'detail-footer-primary',
    onClick: () => onNotice?.('Открыт режим редактирования атрибутов'),
  });
  footer.append(footerClose, editAttributes);

  const drawer = createDrawer({
    id: 'document-detail-drawer',
    title: '',
    content: body,
    footer,
    modal: false,
    showOverlay: false,
    focusOnOpen: false,
    closeOnEscape: false,
    closeLabel: 'Закрыть карточку документа',
    onClose,
  });
  drawer.element.classList.add('document-detail-layer');
  drawer.element.setAttribute('aria-describedby', 'document-detail-navigation-hint');

  const resizeHandle = document.createElement('div');
  resizeHandle.className = 'document-detail-resize-handle';
  resizeHandle.setAttribute('role', 'separator');
  resizeHandle.setAttribute('aria-label', 'Изменить ширину карточки документа');
  resizeHandle.setAttribute('aria-orientation', 'vertical');
  resizeHandle.tabIndex = 0;
  resizeHandle.title = 'Перетащите для изменения ширины. Двойной клик — ширина по умолчанию';
  const resizeIndicator = document.createElement('span');
  resizeIndicator.className = 'document-detail-resize-indicator';
  resizeIndicator.setAttribute('aria-hidden', 'true');
  resizeIndicator.append(createIcon('resize', 18));
  resizeHandle.append(resizeIndicator);
  drawer.element.prepend(resizeHandle);

  const generatedHeader = drawer.element.querySelector('.ds-drawer__header');
  generatedHeader.classList.add('document-detail-header');
  const headerPane = generatedHeader.querySelector('.ds-drawer__header-pane');
  const title = generatedHeader.querySelector('.ds-drawer__title');
  const closeButton = generatedHeader.querySelector('.ds-button');
  closeButton.classList.add('document-detail-close');
  closeButton.title = 'Закрыть (Esc)';
  closeButton.replaceChildren(createIcon('x', 20));

  const titleRow = document.createElement('div');
  titleRow.className = 'document-detail-title-row';
  const heading = document.createElement('div');
  heading.className = 'document-detail-heading';
  const navigationHint = document.createElement('span');
  navigationHint.id = 'document-detail-navigation-hint';
  navigationHint.className = 'sr-only';
  navigationHint.textContent = 'Для переключения документа выберите другое наименование в видимой части таблицы.';
  heading.append(title, navigationHint);
  titleRow.append(heading, closeButton);

  const toolbar = document.createElement('div');
  toolbar.className = 'document-detail-toolbar';
  toolbar.setAttribute('aria-label', 'Инструменты карточки документа');
  toolbar.append(createButton({
    label: 'Открыть',
    icon: createIcon('external'),
    iconOnly: true,
    ariaLabel: 'Открыть документ в отдельном окне',
    variant: 'outlined',
    size: 'small',
    className: 'detail-icon-button',
    onClick: () => onNotice?.('Документ открыт в отдельном окне'),
  }));

  const versionControl = createSelect({
    id: 'document-detail-version',
    label: 'Версия документа',
    options: [],
    onChange: value => onVersionChange?.(Number(value)),
  });
  versionControl.element.classList.add('document-version-control');
  versionControl.element.prepend(createIcon('file', 15));
  versionControl.element.append(createIcon('chevron', 14));
  toolbar.append(versionControl.element);

  const actionsAnchor = document.createElement('div');
  actionsAnchor.className = 'detail-actions-anchor';
  const actionsButton = createButton({
    label: 'Действия',
    icon: createIcon('chevron', 14),
    iconPosition: 'end',
    variant: 'outlined',
    size: 'small',
    className: 'detail-toolbar-button',
    attributes: {
      'aria-haspopup': 'menu',
      'aria-controls': 'document-detail-actions-menu',
      'aria-expanded': 'false',
    },
  });
  const actionsMenu = document.createElement('div');
  actionsMenu.id = 'document-detail-actions-menu';
  actionsMenu.className = 'detail-actions-menu';
  actionsMenu.hidden = true;
  actionsMenu.setAttribute('role', 'menu');
  actionsMenu.setAttribute('aria-label', 'Действия с документом');

  const actionGroups = [
    [{ label: 'Демо Контракстс 12-11-2025', icon: 'play', notice: 'Открыт договор «Демо Контракстс 12-11-2025»' }],
    [
      { label: 'Показать в архиве', icon: 'archive', notice: 'Документ показан в архиве' },
      { label: 'Пакеты документа', icon: 'folder', notice: 'Открыты пакеты документа' },
      { label: 'Связи документа', icon: 'link', notice: 'Открыты связи документа' },
    ],
    [
      { label: 'Редактировать', icon: 'edit', notice: 'Открыт режим редактирования документа' },
      { label: 'Изменить тип', icon: 'settingsFile', notice: 'Открыт выбор типа документа' },
    ],
    [
      { label: 'Создать копию', icon: 'copy', notice: 'Создана копия документа' },
      { label: 'Создать версию', icon: 'plusFile', notice: 'Создана новая версия документа' },
      { label: 'Скачать атрибутивный состав', icon: 'download', notice: 'Атрибутивный состав подготовлен к скачиванию' },
      { label: 'Скачать файлы', icon: 'download', notice: 'Файлы документа подготовлены к скачиванию' },
    ],
    [{ label: 'Пометить на удаление', icon: 'trash', notice: 'Документ помечен на удаление', destructive: true }],
  ];

  const closeActions = ({ restoreFocus = false } = {}) => {
    actionsMenu.hidden = true;
    actionsButton.setAttribute('aria-expanded', 'false');
    if (restoreFocus) actionsButton.focus();
  };
  const runAction = notice => {
    closeActions();
    onNotice?.(notice);
  };
  actionGroups.forEach((group, index) => {
    if (index > 0) {
      const separator = document.createElement('div');
      separator.className = 'detail-actions-separator';
      separator.setAttribute('role', 'separator');
      actionsMenu.append(separator);
    }
    const groupElement = document.createElement('div');
    groupElement.className = 'detail-actions-group';
    group.forEach(action => groupElement.append(createActionItem(action, runAction)));
    actionsMenu.append(groupElement);
  });
  actionsButton.addEventListener('click', () => {
    const willOpen = actionsMenu.hidden;
    actionsMenu.hidden = !willOpen;
    actionsButton.setAttribute('aria-expanded', String(willOpen));
    if (willOpen) actionsMenu.querySelector('[role="menuitem"]')?.focus();
  });
  actionsAnchor.append(actionsButton, actionsMenu);
  toolbar.append(actionsAnchor);

  const copyLink = createButton({
    label: 'Копировать ссылку',
    icon: createIcon('copy', 15),
    variant: 'text',
    size: 'small',
    className: 'copy-document-link',
    onClick: () => onNotice?.('Ссылка на документ скопирована'),
  });
  toolbar.append(copyLink);
  headerPane.replaceChildren(titleRow, toolbar);
  drawer.element.querySelector('.ds-drawer__footer')?.classList.add('document-detail-footer');

  let selectedFileId = null;
  let documentId = null;
  let width = clampDocumentDetailWidth(DEFAULT_DOCUMENT_DETAIL_WIDTH);
  let resizeOriginX = 0;
  let resizeOriginWidth = width;
  let isResizing = false;
  let isUserSized = false;

  const syncWidth = () => {
    const { min, max } = getDocumentDetailWidthBounds();
    drawer.element.style.setProperty('--document-detail-width', `${width}px`);
    drawer.element.dataset.drawerWidth = String(width);
    resizeHandle.setAttribute('aria-valuemin', String(min));
    resizeHandle.setAttribute('aria-valuemax', String(max));
    resizeHandle.setAttribute('aria-valuenow', String(width));
    resizeHandle.setAttribute('aria-valuetext', `${width} пикселей`);
  };

  const commitWidth = (nextWidth, { userSized = true } = {}) => {
    const nextValue = clampDocumentDetailWidth(nextWidth);
    isUserSized = userSized;
    if (nextValue === width) {
      syncWidth();
      return;
    }
    width = nextValue;
    syncWidth();
  };

  const finishResize = event => {
    if (!isResizing) return;
    if (event?.pointerId !== undefined && resizeHandle.hasPointerCapture?.(event.pointerId)) {
      resizeHandle.releasePointerCapture(event.pointerId);
    }
    isResizing = false;
    drawer.element.classList.remove('is-resizing');
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
  };

  const handleResizePointerDown = event => {
    if (event.button !== 0) return;
    event.preventDefault();
    resizeHandle.setPointerCapture?.(event.pointerId);
    resizeOriginX = event.clientX;
    resizeOriginWidth = width;
    isResizing = true;
    drawer.element.classList.add('is-resizing');
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
  };

  const handleResizePointerMove = event => {
    if (!isResizing) return;
    commitWidth(resizeOriginWidth + resizeOriginX - event.clientX);
  };

  const handleResizeDoubleClick = event => {
    event.preventDefault();
    commitWidth(DEFAULT_DOCUMENT_DETAIL_WIDTH, { userSized: false });
  };

  const handleResizeKeyDown = event => {
    const step = event.shiftKey ? RESIZE_LARGE_STEP : RESIZE_STEP;
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      commitWidth(width + step);
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      commitWidth(width - step);
    } else if (event.key === 'Home') {
      event.preventDefault();
      commitWidth(DEFAULT_DOCUMENT_DETAIL_WIDTH, { userSized: false });
    }
  };

  const handleViewportResize = () => {
    commitWidth(isUserSized ? width : DEFAULT_DOCUMENT_DETAIL_WIDTH, { userSized: isUserSized });
  };

  const renderAttributes = attributes => {
    attributesGrid.replaceChildren();
    attributesCount.textContent = String(attributes.length);
    attributes.forEach(attribute => {
      const cell = document.createElement('div');
      cell.className = `document-attribute-cell${attribute.technical ? ' is-technical' : ''}`;
      const label = document.createElement('div');
      label.className = 'document-attribute-label';
      const labelText = document.createElement('span');
      labelText.textContent = attribute.label;
      labelText.title = attribute.label;
      label.append(labelText);
      if (attribute.technical) {
        const badge = document.createElement('span');
        badge.className = 'technical-badge';
        badge.textContent = 'Системный';
        label.append(badge);
      }
      const value = document.createElement('div');
      value.className = 'document-attribute-value';
      value.textContent = attribute.value;
      value.title = attribute.value;
      cell.append(label, value);
      attributesGrid.append(cell);
    });
  };

  const renderFiles = files => {
    filesList.replaceChildren();
    filesCount.textContent = String(files.length);
    files.forEach(file => {
      const row = document.createElement('div');
      row.className = `document-file-row${selectedFileId === file.id ? ' is-selected' : ''}`;
      const selectFile = createButton({
        label: '',
        variant: 'text',
        className: 'document-file-select',
        ariaLabel: `Выбрать файл ${file.name}`,
        attributes: { 'aria-pressed': String(selectedFileId === file.id) },
        onClick: () => {
          selectedFileId = file.id;
          renderFiles(files);
        },
      });
      const fileIcon = document.createElement('span');
      fileIcon.className = 'document-file-icon';
      fileIcon.append(createIcon('file', 24));
      const meta = document.createElement('span');
      meta.className = 'document-file-meta';
      const name = document.createElement('strong');
      name.textContent = file.name;
      name.title = file.name;
      const description = document.createElement('span');
      description.textContent = `${file.format} · ${file.size}`;
      meta.append(name, description);
      selectFile.append(fileIcon, meta);
      const download = createButton({
        label: 'Скачать',
        icon: createIcon('download'),
        iconOnly: true,
        ariaLabel: `Скачать ${file.name}`,
        variant: 'outlined',
        size: 'small',
        className: 'document-file-download',
        onClick: () => onNotice?.(`Файл «${file.name}» подготовлен к скачиванию`),
      });
      row.append(selectFile, download);
      filesList.append(row);
    });
  };

  const update = ({ document: nextDocument, version, versions = [], attributes = [], files = [] } = {}) => {
    if (!nextDocument) return;
    if (documentId !== nextDocument.id) {
      documentId = nextDocument.id;
      selectedFileId = files[0]?.id ?? null;
      closeActions();
    }
    title.textContent = nextDocument.name;
    title.title = nextDocument.name;
    replaceOptions(versionControl.select, versions, version);
    renderAttributes(attributes);
    renderFiles(files);
  };

  const handlePointerDown = event => {
    if (!actionsMenu.hidden && !actionsAnchor.contains(event.target)) closeActions();
  };
  const handleKeydown = event => {
    if (event.key !== 'Escape' || !drawer.element.classList.contains('is-active')) return;
    if (!actionsMenu.hidden) {
      event.preventDefault();
      closeActions({ restoreFocus: true });
      return;
    }
    drawer.close();
  };
  document.addEventListener('pointerdown', handlePointerDown);
  document.addEventListener('keydown', handleKeydown);
  footerClose.addEventListener('click', drawer.close);
  resizeHandle.addEventListener('pointerdown', handleResizePointerDown);
  resizeHandle.addEventListener('pointermove', handleResizePointerMove);
  resizeHandle.addEventListener('pointerup', finishResize);
  resizeHandle.addEventListener('pointercancel', finishResize);
  resizeHandle.addEventListener('dblclick', handleResizeDoubleClick);
  resizeHandle.addEventListener('keydown', handleResizeKeyDown);
  window.addEventListener('resize', handleViewportResize);
  syncWidth();

  return {
    element: drawer.element,
    open() {
      handleViewportResize();
      drawer.open();
    },
    close: drawer.close,
    update,
    mount: drawer.mount,
    destroy() {
      finishResize();
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeydown);
      resizeHandle.removeEventListener('pointerdown', handleResizePointerDown);
      resizeHandle.removeEventListener('pointermove', handleResizePointerMove);
      resizeHandle.removeEventListener('pointerup', finishResize);
      resizeHandle.removeEventListener('pointercancel', finishResize);
      resizeHandle.removeEventListener('dblclick', handleResizeDoubleClick);
      resizeHandle.removeEventListener('keydown', handleResizeKeyDown);
      window.removeEventListener('resize', handleViewportResize);
      drawer.destroy();
    },
  };
}
