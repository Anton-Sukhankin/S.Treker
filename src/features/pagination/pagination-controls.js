import { getPaginationItems } from '../../domain/pagination.js';

export function renderPaginationControls(totalPages, current, totalTasks, tabName) {
  const container = document.getElementById('js-pagination-container');
  const wrapper = document.getElementById('js-pagination-wrapper');
  if (!container || !wrapper) return;

  if (totalTasks <= (window.paginationState?.pageSize || 20)) {
    container.style.display = 'none';
    return;
  }

  container.style.display = 'flex';

  const pages = getPaginationItems(totalPages, current);
  const prevDisabled = current === 1;
  const nextDisabled = current === totalPages;

  function renderPageItem(page) {
    if (page === '...') {
      return `<div class="ds-pagination-item ds-pagination-item--ellipsis">...</div>`;
    }

    if (page === current) {
      return `<div class="ds-pagination-item ds-pagination-item--active">${page}</div>`;
    }

    return `<button class="ds-pagination-item js-page-jump" type="button" data-page="${page}">${page}</button>`;
  }

  function renderArrowButton(direction, disabled) {
    const icon = direction === 'prev'
      ? '<polyline points="15 18 9 12 15 6"></polyline>'
      : '<polyline points="9 18 15 12 9 6"></polyline>';

    return `
      <button class="ds-pagination-arrow js-page-${direction}" type="button" ${disabled ? 'disabled' : ''}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">${icon}</svg>
      </button>
    `;
  }

  wrapper.innerHTML = `
    ${renderArrowButton('prev', prevDisabled)}
    ${pages.map(renderPageItem).join('')}
    ${renderArrowButton('next', nextDisabled)}
  `;

  wrapper.querySelectorAll('.js-page-jump').forEach(button => {
    button.addEventListener('click', () => {
      window.paginationState.current = parseInt(button.getAttribute('data-page'), 10);
      window.renderTab(tabName, true);
    });
  });

  wrapper.querySelector('.js-page-prev')?.addEventListener('click', () => {
    window.paginationState.current--;
    window.renderTab(tabName, true);
  });

  wrapper.querySelector('.js-page-next')?.addEventListener('click', () => {
    window.paginationState.current++;
    window.renderTab(tabName, true);
  });
}
