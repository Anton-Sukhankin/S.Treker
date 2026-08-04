import { initEsmSearchApp } from './runtime/search-runtime.js';

function getNavLink(section) {
  return document.querySelector(`.app-header-nav .nav-link[data-section="${section}"]`);
}

function closeTaskWorkspaceLayers(clearTaskSelection, closeTaskCard) {
  document.getElementById('filter-overlay')?.classList.remove('is-active');
  document.getElementById('filter-drawer')?.classList.remove('is-active');
  document.getElementById('columns-overlay')?.classList.remove('is-active');
  document.getElementById('columns-drawer')?.classList.remove('is-active', 'is-expanded');
  document.querySelectorAll('.js-multi-select.is-open').forEach(item => item.classList.remove('is-open'));

  document.querySelectorAll('dialog[open]').forEach(dialog => {
    if (typeof dialog.close === 'function') dialog.close();
  });

  clearTaskSelection();
  closeTaskCard?.();
}

export function initSearchSectionNavigation({ clearTaskSelection, closeTaskCard }) {
  const appLayout = document.querySelector('.app-layout');
  const searchSection = document.getElementById('js-esm-search-section');
  const tasksLink = getNavLink('tasks');
  const searchLink = getNavLink('search');

  if (!appLayout || !searchSection || !tasksLink || !searchLink) return;

  initEsmSearchApp();

  function setActiveSection(section) {
    const isSearch = section === 'search';
    document.querySelectorAll('.app-header-nav .nav-link').forEach(link => {
      link.classList.toggle('is-active', link.dataset.section === section);
    });

    appLayout.hidden = isSearch;
    searchSection.hidden = !isSearch;
    document.body.classList.toggle('is-esm-search-active', isSearch);

    if (isSearch) {
      closeTaskWorkspaceLayers(clearTaskSelection, closeTaskCard);
    }
  }

  tasksLink.addEventListener('click', event => {
    event.preventDefault();
    setActiveSection('tasks');
  });

  searchLink.addEventListener('click', event => {
    event.preventDefault();
    setActiveSection('search');
  });
}
