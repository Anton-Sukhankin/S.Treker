export function initGlobalSearch() {
  const input = document.getElementById('js-global-search');
  if (!input) return;

  input.oninput = () => {
    if (!window.activeFilters) return;
    window.activeFilters.search = input.value.trim();
    if (typeof window.applyFilters === 'function') window.applyFilters({ keepDrawerOpen: true });
  };
}


export function initViewSwitcher() {
  const switcherItems = document.querySelectorAll('.js-view-switcher .ds-segmented-control__item');
  const cardsView = document.getElementById('view-mode-cards');
  const tableView = document.getElementById('view-mode-table');
  const downloadButton = document.getElementById('js-download-btn');
  const columnsButton = document.getElementById('js-columns-btn');

  switcherItems.forEach(item => {
    item.onclick = () => {
      const view = item.getAttribute('data-view');
      const isTableView = view === 'table';

      switcherItems.forEach(current => current.classList.remove('is-active'));
      item.classList.add('is-active');

      if (cardsView) cardsView.style.display = isTableView ? 'none' : 'flex';
      if (tableView) tableView.style.display = isTableView ? 'flex' : 'none';
      if (downloadButton) downloadButton.style.display = isTableView ? 'inline-flex' : 'none';
      if (columnsButton) columnsButton.style.display = isTableView ? 'inline-flex' : 'none';
    };
  });
}


export function initSidebarResize() {
  const r = document.getElementById('js-sidebar-resizer');
  if (!r) return;

  let isResizing = false;
  const getCssPixelValue = (name, fallback) => {
    const value = getComputedStyle(document.documentElement).getPropertyValue(name);
    const parsed = Number.parseFloat(value);
    return Number.isFinite(parsed) ? parsed : fallback;
  };

  const minWidth = getCssPixelValue('--sidebar-min-width', 368);
  const maxWidth = 800;

  const resize = event => {
    if (!isResizing) return;
    const width = Math.min(maxWidth, Math.max(minWidth, event.clientX));
    document.documentElement.style.setProperty('--sidebar-width', `${width}px`);
  };

  const stop = () => {
    if (!isResizing) return;
    isResizing = false;
    r.classList.remove('is-active');
    document.body.classList.remove('is-sidebar-resizing');
    document.removeEventListener('mousemove', resize);
    document.removeEventListener('mouseup', stop);
  };

  r.addEventListener('mousedown', event => {
    event.preventDefault();
    isResizing = true;
    r.classList.add('is-active');
    document.body.classList.add('is-sidebar-resizing');
    document.addEventListener('mousemove', resize);
    document.addEventListener('mouseup', stop);
  });
}


export function initSidebarAccordions() {
  document.querySelectorAll('.js-accordion-toggle').forEach(toggle => {
    toggle.onclick = () => {
      toggle.closest('.ds-accordion')?.classList.toggle('is-expanded');
    };
  });
}



export function initFloatingTableHeader() {
  const container = document.querySelector('.ds-table-container');
  const floating = document.getElementById('js-floating-header');
  if (!container || !floating) return;
  const floatingInner = floating.querySelector('.ds-floating-header__inner');
  const floatingTable = floating.querySelector('.ds-table--floating');
  const floatingThead = floatingTable.querySelector('thead');

  const sync = () => {
    const realTable = document.querySelector('.ds-table:not(.ds-table--floating)');
    const realThead = realTable?.querySelector('thead');
    if (!realTable || !realThead) return;

    floatingInner.scrollLeft = container.scrollLeft;
    floating.style.display = (container.scrollTop > 10) ? 'block' : 'none';

    if (floating.style.display === 'block') {
      const realThs = realThead.querySelectorAll('th');
      let floatingThs = floatingThead.querySelectorAll('th');
      if (floatingThs.length !== realThs.length) {
        floatingThead.innerHTML = realThead.innerHTML;
        floatingThs = floatingThead.querySelectorAll('th');
      }
      realThs.forEach((th, i) => {
        const w = th.getBoundingClientRect().width + 'px';
        if (floatingThs[i]) {
          floatingThs[i].style.width = w;
          floatingThs[i].style.minWidth = w;
        }
      });
      floatingTable.style.width = realTable.getBoundingClientRect().width + 'px';
    }
  };

  container.addEventListener('scroll', sync);
  window.addEventListener('resize', sync);
  window.addEventListener('table-rendered', () => { sync(); });
}



export function initSystemOverlay() {}

export function initPrintAction({ showToast }) {
  document.getElementById('js-print-btn')?.addEventListener('click', () => {
    showToast('\u041f\u043e\u0434\u0433\u043e\u0442\u043e\u0432\u043a\u0430 \u043a \u043f\u0435\u0447\u0430\u0442\u0438...');
  });
}

export function initTableScrollShadow() {
  const tableContainer = document.querySelector('.ds-table-container');
  if (!tableContainer) return;

  tableContainer.addEventListener('scroll', () => {
    tableContainer.classList.toggle('is-scrolled', tableContainer.scrollLeft > 0);
  });
}
