import { createPagination } from '../../ui/components/pagination.js';

export function renderPaginationControls(totalPages, current, totalTasks, tabName) {
  const container = document.getElementById('js-pagination-container');
  const wrapper = document.getElementById('js-pagination-wrapper');
  if (!container || !wrapper) return;

  if (totalTasks <= (window.paginationState?.pageSize || 20)) {
    container.style.display = 'none';
    return;
  }

  container.style.display = 'flex';

  const pagination = createPagination({
    currentPage: current,
    totalPages,
    label: 'Страницы списка задач',
    onChange: page => {
      window.paginationState.current = page;
      window.renderTab(tabName, true);
    },
  });
  wrapper.replaceChildren(pagination.element);
}
