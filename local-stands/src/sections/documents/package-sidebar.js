import { createButton, createInput } from '@s-tracker/ui';

export const DEFAULT_PACKAGE_SIDEBAR_WIDTH = 320;
export const MIN_PACKAGE_SIDEBAR_WIDTH = 272;
export const MAX_PACKAGE_SIDEBAR_WIDTH = 560;

const RESIZE_STEP = 16;
const RESIZE_LARGE_STEP = 40;
const SVG_NAMESPACE = 'http://www.w3.org/2000/svg';

function element(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function icon(definitions, className = 'package-sidebar-icon') {
  const svg = document.createElementNS(SVG_NAMESPACE, 'svg');
  svg.setAttribute('viewBox', '0 0 20 20');
  svg.setAttribute('aria-hidden', 'true');
  svg.setAttribute('fill', 'none');
  svg.setAttribute('stroke', 'currentColor');
  svg.setAttribute('stroke-width', '1.7');
  svg.setAttribute('stroke-linecap', 'round');
  svg.setAttribute('stroke-linejoin', 'round');
  svg.classList.add(className);

  definitions.forEach(definition => {
    const child = document.createElementNS(SVG_NAMESPACE, definition.tag || 'path');
    Object.entries(definition).forEach(([name, value]) => {
      if (name !== 'tag') child.setAttribute(name, value);
    });
    svg.append(child);
  });

  return svg;
}

const icons = {
  search: () => icon([
    { tag: 'circle', cx: '8.5', cy: '8.5', r: '5.25' },
    { d: 'm12.4 12.4 4.1 4.1' },
  ]),
  clear: () => icon([{ d: 'm5.5 5.5 9 9m0-9-9 9' }]),
  folder: () => icon([
    { d: 'M2.8 5.3a1.5 1.5 0 0 1 1.5-1.5h3l1.6 1.8h6.8a1.5 1.5 0 0 1 1.5 1.5v7.6a1.5 1.5 0 0 1-1.5 1.5H4.3a1.5 1.5 0 0 1-1.5-1.5Z' },
  ]),
  folderPlus: () => icon([
    { d: 'M2.8 5.3a1.5 1.5 0 0 1 1.5-1.5h3l1.6 1.8h6.8a1.5 1.5 0 0 1 1.5 1.5v7.6a1.5 1.5 0 0 1-1.5 1.5H4.3a1.5 1.5 0 0 1-1.5-1.5Z' },
    { d: 'M10 8.5v5M7.5 11h5' },
  ]),
  folderMinus: () => icon([
    { d: 'M2.8 5.3a1.5 1.5 0 0 1 1.5-1.5h3l1.6 1.8h6.8a1.5 1.5 0 0 1 1.5 1.5v7.6a1.5 1.5 0 0 1-1.5 1.5H4.3a1.5 1.5 0 0 1-1.5-1.5Z' },
    { d: 'M7.5 11h5' },
  ]),
  more: () => icon([
    { tag: 'circle', cx: '10', cy: '4.5', r: '.8', fill: 'currentColor', stroke: 'none' },
    { tag: 'circle', cx: '10', cy: '10', r: '.8', fill: 'currentColor', stroke: 'none' },
    { tag: 'circle', cx: '10', cy: '15.5', r: '.8', fill: 'currentColor', stroke: 'none' },
  ]),
  plus: () => icon([{ d: 'M10 4v12M4 10h12' }]),
  resize: () => icon([
    { d: 'M3.5 10h13M6.5 7 3.5 10l3 3M13.5 7l3 3-3 3' },
  ]),
};

function toIdSet(value) {
  if (value instanceof Set) return new Set(value);
  return new Set(Array.isArray(value) ? value : []);
}

function sameIdSet(first, second) {
  return first.size === second.size && Array.from(first).every(id => second.has(id));
}

function clampSidebarWidth(value) {
  const numericValue = Number(value);
  const safeValue = Number.isFinite(numericValue) ? numericValue : DEFAULT_PACKAGE_SIDEBAR_WIDTH;
  return Math.min(MAX_PACKAGE_SIDEBAR_WIDTH, Math.max(MIN_PACKAGE_SIDEBAR_WIDTH, Math.round(safeValue)));
}

function normalizeState(options) {
  return {
    packages: Array.isArray(options.packages) ? options.packages : [],
    selectedPackageId: options.selectedPackageId ?? null,
    expandedIds: toIdSet(options.expandedIds),
    forcedExpandedIds: toIdSet(options.forcedExpandedIds),
    query: String(options.query ?? ''),
    width: clampSidebarWidth(options.width),
    canCreatePackage: options.canCreatePackage !== false,
    emptyMessage: options.emptyMessage || 'Пакеты не найдены',
  };
}

function createIconButton({ label, iconNode, className, onClick, attributes = {} }) {
  const button = createButton({
    label,
    ariaLabel: label,
    icon: iconNode,
    iconOnly: true,
    variant: 'text',
    className,
    attributes,
    onClick,
  });
  button.title = label;
  return button;
}

/**
 * Creates the package navigation UI. Package filtering and document selection are
 * intentionally owned by the caller; pass the visible tree and forced paths in update().
 */
export function createPackageSidebar(options = {}) {
  let configuration = { ...options };
  let state = normalizeState(configuration);
  let destroyed = false;
  let isResizing = false;
  let isResizeHovered = false;
  let openMenuId = null;
  let openMenuTrigger = null;
  let resizeOriginX = 0;
  let resizeOriginWidth = state.width;
  let truncationObservers = [];

  const sidebar = element('aside', 'package-sidebar');
  sidebar.setAttribute('aria-label', 'Пакеты документов');

  const header = element('header', 'package-sidebar-header');
  const searchWrap = element('div', 'package-search-wrap');
  searchWrap.append(icons.search());

  const searchControl = createInput({
    value: state.query,
    placeholder: 'Поиск по названию пакета',
    attributes: {
      'aria-label': 'Поиск по названию пакета',
      autocomplete: 'off',
    },
    onInput: value => {
      state.query = value;
      syncSearchControls();
      configuration.onQueryChange?.(value);
    },
  });
  searchControl.element.classList.add('package-search-field');
  searchControl.input.classList.add('package-search-input');

  const clearSearchButton = createIconButton({
    label: 'Очистить поиск',
    iconNode: icons.clear(),
    className: 'package-search-clear',
    onClick: () => {
      if (!state.query) return;
      state.query = '';
      searchControl.setValue('');
      syncSearchControls();
      configuration.onQueryChange?.('');
      searchControl.input.focus();
    },
  });
  searchWrap.append(searchControl.element, clearSearchButton);
  header.append(searchWrap);

  const content = element('div', 'package-tree-scroll');
  const tree = element('div', 'package-tree');
  tree.setAttribute('role', 'tree');
  tree.setAttribute('aria-label', 'Дерево пакетов');
  content.append(tree);

  const footer = element('footer', 'package-sidebar-footer');
  const createPackageButton = createButton({
    label: 'Создать пакет',
    icon: icons.plus(),
    variant: 'outlined',
    className: 'create-package-button',
    onClick: event => configuration.onCreatePackage?.({ parentId: null, trigger: event.currentTarget }),
  });
  createPackageButton.disabled = !state.canCreatePackage;
  footer.append(createPackageButton);

  const resizeHandle = element('div', 'sidebar-resize-handle');
  resizeHandle.setAttribute('role', 'separator');
  resizeHandle.setAttribute('aria-label', 'Изменить ширину панели пакетов');
  resizeHandle.setAttribute('aria-orientation', 'vertical');
  resizeHandle.setAttribute('aria-valuemin', String(MIN_PACKAGE_SIDEBAR_WIDTH));
  resizeHandle.setAttribute('aria-valuemax', String(MAX_PACKAGE_SIDEBAR_WIDTH));
  resizeHandle.tabIndex = 0;
  resizeHandle.title = 'Перетащите для изменения ширины. Двойной клик — ширина по умолчанию';
  const resizeIndicator = element('span', 'resize-indicator');
  resizeIndicator.setAttribute('aria-hidden', 'true');
  resizeIndicator.append(icons.resize());
  resizeHandle.append(resizeIndicator);

  sidebar.append(header, content, footer, resizeHandle);

  function syncSearchControls() {
    clearSearchButton.hidden = !state.query;
    clearSearchButton.disabled = !state.query;
  }

  function syncWidth() {
    sidebar.style.setProperty('--package-sidebar-width', `${state.width}px`);
    sidebar.dataset.sidebarWidth = String(state.width);
    resizeHandle.setAttribute('aria-valuenow', String(state.width));
    resizeHandle.setAttribute('aria-valuetext', `${state.width} пикселей`);
  }

  function emitResizeState() {
    configuration.onResizeStateChange?.({
      isResizing,
      isHovered: isResizeHovered,
      width: state.width,
    });
  }

  function syncResizeState() {
    sidebar.classList.toggle('is-resizing', isResizing);
    sidebar.classList.toggle('is-resize-hovered', isResizeHovered);
    resizeHandle.classList.toggle('is-active', isResizing || isResizeHovered);
    resizeHandle.dataset.resizeState = isResizing ? 'resizing' : isResizeHovered ? 'hovered' : 'idle';
  }

  function commitWidth(nextWidth, reason) {
    const width = clampSidebarWidth(nextWidth);
    if (width === state.width) return;
    state.width = width;
    syncWidth();
    configuration.onWidthChange?.(width, { reason });
  }

  function finishResize(event) {
    if (!isResizing) return;
    if (event?.pointerId !== undefined && resizeHandle.hasPointerCapture?.(event.pointerId)) {
      resizeHandle.releasePointerCapture(event.pointerId);
    }
    isResizing = false;
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
    syncResizeState();
    emitResizeState();
  }

  function handleResizePointerEnter() {
    isResizeHovered = true;
    syncResizeState();
    emitResizeState();
  }

  function handleResizePointerLeave() {
    isResizeHovered = false;
    syncResizeState();
    emitResizeState();
  }

  function handleResizePointerDown(event) {
    if (event.button !== 0) return;
    event.preventDefault();
    resizeHandle.setPointerCapture?.(event.pointerId);
    resizeOriginX = event.clientX;
    resizeOriginWidth = state.width;
    isResizing = true;
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
    syncResizeState();
    emitResizeState();
  }

  function handleResizePointerMove(event) {
    if (!isResizing) return;
    commitWidth(resizeOriginWidth + event.clientX - resizeOriginX, 'pointer');
  }

  function handleResizeDoubleClick(event) {
    event.preventDefault();
    commitWidth(DEFAULT_PACKAGE_SIDEBAR_WIDTH, 'reset');
  }

  function handleResizeKeyDown(event) {
    const step = event.shiftKey ? RESIZE_LARGE_STEP : RESIZE_STEP;
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      commitWidth(state.width - step, 'keyboard');
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      commitWidth(state.width + step, 'keyboard');
    } else if (event.key === 'Home') {
      event.preventDefault();
      commitWidth(DEFAULT_PACKAGE_SIDEBAR_WIDTH, 'reset');
    }
  }

  function handleDocumentPointerDown(event) {
    if (!openMenuId || !(event.target instanceof Node)) return;
    const menu = tree.querySelector('.package-menu');
    if (openMenuTrigger?.contains(event.target) || menu?.contains(event.target)) return;
    closeOpenMenu();
  }

  function handleDocumentKeyDown(event) {
    if (event.key !== 'Escape' || !openMenuId) return;
    event.preventDefault();
    closeOpenMenu({ restoreFocus: true });
  }

  resizeHandle.addEventListener('pointerenter', handleResizePointerEnter);
  resizeHandle.addEventListener('pointerleave', handleResizePointerLeave);
  resizeHandle.addEventListener('pointerdown', handleResizePointerDown);
  resizeHandle.addEventListener('pointermove', handleResizePointerMove);
  resizeHandle.addEventListener('pointerup', finishResize);
  resizeHandle.addEventListener('pointercancel', finishResize);
  resizeHandle.addEventListener('dblclick', handleResizeDoubleClick);
  resizeHandle.addEventListener('keydown', handleResizeKeyDown);
  document.addEventListener('pointerdown', handleDocumentPointerDown);
  document.addEventListener('keydown', handleDocumentKeyDown);

  function clearTruncationObservers() {
    truncationObservers.forEach(disconnect => disconnect());
    truncationObservers = [];
  }

  function watchTruncation(nameElement, name) {
    const measure = () => {
      const isTruncated = nameElement.scrollWidth > nameElement.clientWidth + 1;
      if (isTruncated) nameElement.title = name;
      else nameElement.removeAttribute('title');
    };

    measure();
    const frameId = typeof requestAnimationFrame === 'function'
      ? requestAnimationFrame(measure)
      : null;
    if (typeof ResizeObserver === 'function') {
      const observer = new ResizeObserver(measure);
      observer.observe(nameElement);
      truncationObservers.push(() => {
        observer.disconnect();
        if (frameId !== null) cancelAnimationFrame(frameId);
      });
      return;
    }

    window.addEventListener('resize', measure);
    truncationObservers.push(() => {
      window.removeEventListener('resize', measure);
      if (frameId !== null) cancelAnimationFrame(frameId);
    });
  }

  function selectPackage(packageId) {
    state.selectedPackageId = packageId;
    closeOpenMenu();
    tree.querySelectorAll('.package-row').forEach(row => {
      const selected = row.dataset.packageId === packageId;
      row.classList.toggle('is-selected', selected);
      row.setAttribute('aria-selected', String(selected));
    });
    configuration.onSelectPackage?.(packageId);
  }

  function togglePackage(node, hasChildren, expanded) {
    if (!hasChildren || state.query.trim()) return;
    const restoreFolderToggle = document.activeElement?.classList.contains('folder-toggle');
    const nextExpanded = !expanded;
    if (nextExpanded) state.expandedIds.add(node.id);
    else state.expandedIds.delete(node.id);
    renderTree();
    const nextRow = Array.from(tree.querySelectorAll('.package-row'))
      .find(row => row.dataset.packageId === node.id);
    const focusTarget = restoreFolderToggle ? nextRow?.querySelector('.folder-toggle') : nextRow;
    focusTarget?.focus({ preventScroll: true });
    configuration.onTogglePackage?.(node.id, nextExpanded);
  }

  function closeOpenMenu({ restoreFocus = false } = {}) {
    if (!openMenuId) return;
    const trigger = openMenuTrigger;
    tree.querySelector('.package-menu')?.remove();
    trigger?.classList.remove('is-open');
    trigger?.setAttribute('aria-expanded', 'false');
    openMenuId = null;
    openMenuTrigger = null;
    if (restoreFocus) trigger?.focus({ preventScroll: true });
  }

  function createPackageMenu(node, menuButton) {
    const menu = element('div', 'package-menu');
    menu.setAttribute('role', 'menu');
    menu.setAttribute('aria-label', `Действия пакета «${node.name}»`);
    menu.addEventListener('click', event => event.stopPropagation());

    const createNestedButton = createButton({
      label: 'Создать вложенный',
      variant: 'text',
      className: 'package-menu-item',
      attributes: { role: 'menuitem' },
      onClick: () => {
        closeOpenMenu();
        configuration.onCreatePackage?.({ parentId: node.id, trigger: menuButton });
      },
    });
    const renameButton = createButton({
      label: 'Переименовать',
      variant: 'text',
      className: 'package-menu-item',
      attributes: { role: 'menuitem' },
      onClick: () => {
        closeOpenMenu();
        configuration.onRenamePackage?.({ packageId: node.id, trigger: menuButton });
      },
    });
    menu.append(createNestedButton, renameButton);
    return menu;
  }

  function createTreeNode(node, depth, isLast, ancestorContinuation) {
    const wrapper = element('div', 'package-tree-node');
    const hasChildren = Boolean(node.children?.length);
    const expanded = hasChildren && (state.expandedIds.has(node.id) || state.forcedExpandedIds.has(node.id));
    const selected = state.selectedPackageId === node.id;
    const row = element('div', `package-row${selected ? ' is-selected' : ''}`);
    row.setAttribute('role', 'treeitem');
    row.dataset.packageId = node.id;
    row.setAttribute('aria-level', String(depth + 1));
    row.setAttribute('aria-selected', String(selected));
    if (hasChildren) row.setAttribute('aria-expanded', String(expanded));
    row.tabIndex = 0;

    const indent = element('div', 'tree-indent');
    indent.setAttribute('aria-hidden', 'true');
    ancestorContinuation.forEach(continues => {
      indent.append(element('span', continues ? 'guide-line' : ''));
    });
    if (depth > 0) indent.append(element('span', isLast ? 'guide-branch guide-branch-last' : 'guide-branch'));

    const folderButton = createIconButton({
      label: hasChildren
        ? `${expanded ? 'Свернуть' : 'Развернуть'} пакет «${node.name}»`
        : `Пакет «${node.name}»`,
      iconNode: hasChildren ? (expanded ? icons.folderMinus() : icons.folderPlus()) : icons.folder(),
      className: 'folder-toggle',
      attributes: hasChildren ? { 'aria-expanded': String(expanded) } : {},
      onClick: event => {
        event.stopPropagation();
        if (hasChildren) togglePackage(node, hasChildren, expanded);
        else selectPackage(node.id);
      },
    });

    const name = element('span', 'package-name', node.name);
    watchTruncation(name, node.name);

    const menuButton = createIconButton({
      label: `Действия пакета «${node.name}»`,
      iconNode: icons.more(),
      className: `package-more${openMenuId === node.id ? ' is-open' : ''}`,
      attributes: {
        'aria-haspopup': 'menu',
        'aria-expanded': String(openMenuId === node.id),
      },
      onClick: event => {
        event.stopPropagation();
        if (openMenuId === node.id) {
          closeOpenMenu();
          return;
        }
        closeOpenMenu();
        openMenuId = node.id;
        openMenuTrigger = menuButton;
        menuButton.classList.add('is-open');
        menuButton.setAttribute('aria-expanded', 'true');
        row.append(createPackageMenu(node, menuButton));
      },
    });

    row.addEventListener('click', () => selectPackage(node.id));
    row.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        selectPackage(node.id);
      } else if (event.key === 'ArrowRight' && hasChildren && !expanded) {
        event.preventDefault();
        togglePackage(node, hasChildren, expanded);
      } else if (event.key === 'ArrowLeft' && hasChildren && expanded && !state.query.trim()) {
        event.preventDefault();
        togglePackage(node, hasChildren, expanded);
      }
    });

    row.append(indent, folderButton, name, menuButton);
    if (openMenuId === node.id) row.append(createPackageMenu(node, menuButton));
    wrapper.append(row);

    if (expanded && hasChildren) {
      const group = element('div', 'package-tree-group');
      group.setAttribute('role', 'group');
      node.children.forEach((child, index) => {
        group.append(createTreeNode(
          child,
          depth + 1,
          index === node.children.length - 1,
          [...ancestorContinuation, !isLast],
        ));
      });
      wrapper.append(group);
    }

    return wrapper;
  }

  function renderTree() {
    if (destroyed) return;
    openMenuId = null;
    openMenuTrigger = null;
    clearTruncationObservers();
    tree.replaceChildren();
    if (!state.packages.length) {
      const empty = element('div', 'package-empty');
      empty.append(icons.folder(), element('p', '', state.emptyMessage));
      if (state.query) {
        const resetButton = createButton({
          label: 'Сбросить поиск',
          variant: 'text',
          className: 'package-empty-reset',
          onClick: () => {
            state.query = '';
            searchControl.setValue('');
            syncSearchControls();
            configuration.onQueryChange?.('');
            searchControl.input.focus();
          },
        });
        empty.append(resetButton);
      }
      tree.append(empty);
      return;
    }

    state.packages.forEach((node, index) => {
      tree.append(createTreeNode(node, 0, index === state.packages.length - 1, []));
    });
  }

  function update(next = {}) {
    if (destroyed) return;
    configuration = { ...configuration, ...next };
    const nextState = normalizeState({
      ...state,
      ...next,
      expandedIds: next.expandedIds ?? state.expandedIds,
      forcedExpandedIds: next.forcedExpandedIds ?? state.forcedExpandedIds,
    });
    const queryChanged = nextState.query !== state.query;
    const widthChanged = nextState.width !== state.width;
    const treeChanged = nextState.packages !== state.packages
      || nextState.selectedPackageId !== state.selectedPackageId
      || !sameIdSet(nextState.expandedIds, state.expandedIds)
      || !sameIdSet(nextState.forcedExpandedIds, state.forcedExpandedIds)
      || queryChanged
      || nextState.emptyMessage !== state.emptyMessage;
    state = nextState;
    if (queryChanged && searchControl.input.value !== state.query) searchControl.setValue(state.query);
    createPackageButton.disabled = !state.canCreatePackage;
    syncSearchControls();
    if (widthChanged) syncWidth();
    if (treeChanged) renderTree();
  }

  function destroy() {
    if (destroyed) return;
    finishResize();
    destroyed = true;
    resizeHandle.removeEventListener('pointerenter', handleResizePointerEnter);
    resizeHandle.removeEventListener('pointerleave', handleResizePointerLeave);
    resizeHandle.removeEventListener('pointerdown', handleResizePointerDown);
    resizeHandle.removeEventListener('pointermove', handleResizePointerMove);
    resizeHandle.removeEventListener('pointerup', finishResize);
    resizeHandle.removeEventListener('pointercancel', finishResize);
    resizeHandle.removeEventListener('dblclick', handleResizeDoubleClick);
    resizeHandle.removeEventListener('keydown', handleResizeKeyDown);
    document.removeEventListener('pointerdown', handleDocumentPointerDown);
    document.removeEventListener('keydown', handleDocumentKeyDown);
    clearTruncationObservers();
    sidebar.remove();
  }

  syncSearchControls();
  syncWidth();
  syncResizeState();
  renderTree();

  return {
    element: sidebar,
    update,
    focusSearch() {
      searchControl.input.focus();
    },
    getWidth() {
      return state.width;
    },
    destroy,
  };
}
