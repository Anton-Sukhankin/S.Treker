import { MOCK_LAYOUTS, generateTask } from '../../data/mock-tasks.js';
import { REVERSE_STATUS_MAP } from '../../data/statuses.js';
import { getActiveColumns } from '../../domain/columns.js';
import { skipFilters } from '../../domain/filters.js';
import { paginateItems } from '../../domain/pagination.js';
import { EMPTY_STATE_HTML } from '../../ui/empty-state.js';
import { showToast } from '../../ui/toast.js';
import { renderPaginationControls } from '../pagination/pagination-controls.js';
import { updateSidebarCounts } from '../sidebar/sidebar.js';

function escapeHtml(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function renderPersonCell(person, modifier = '') {
  if (!person) return '<span class="ds-table-empty-val">–</span>';
  const className = ['ds-person-cell', modifier ? `ds-person-cell--${modifier}` : ''].filter(Boolean).join(' ');
  const displayName = escapeHtml(person.displayName || person.fullName || person.label);
  const fullName = escapeHtml(person.fullName || person.displayName || person.label);
  const email = escapeHtml(person.email);
  const avatar = escapeHtml(person.avatarUrl);

  return `
    <div class="${className}" title="${fullName}">
      <img class="ds-person-cell__avatar" src="${avatar}" alt="${fullName}" loading="lazy">
      <div class="ds-person-cell__body">
        <span class="ds-person-cell__name">${displayName}</span>
        <button class="ds-person-cell__email js-copy-person-email" type="button" data-email="${email}" title="Скопировать email">${email}</button>
      </div>
    </div>
  `;
}

function isOverdueDateColumn(task, sysId, columnKey, columns = []) {
  if (!task.isOverdue) return false;
  if (sysId === 'ecm') return columnKey === 'regDate';
  if (sysId === 'tracker') return columnKey === 'dueDate';
  if (sysId === 'control') {
    return columnKey === 'checkDate' || (columnKey === 'regDate' && columns.some(column => column.key === 'sys'));
  }
  return false;
}

function renderDateValue(value, isAlert = false) {
  if (!value) return '<span class="ds-table-empty-val">–</span>';
  const content = escapeHtml(value);
  return `
    <span class="ds-task-date ${isAlert ? 'ds-task-date--alert' : ''}">
      <svg class="ds-task-date__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
        <rect x="3" y="4" width="18" height="18" rx="2"></rect>
        <path d="M16 2v4"></path>
        <path d="M8 2v4"></path>
        <path d="M3 10h18"></path>
      </svg>
      <span class="ds-task-date__value">${content}</span>
    </span>
  `;
}

function renderTaskTitle(title) {
  const value = escapeHtml(title);
  return `
    <span class="ds-task-title" title="${value}">
      <svg class="ds-task-title__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
        <path d="M9 11l2 2 4-4"></path>
        <path d="M5 4h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z"></path>
      </svg>
      <span class="ds-task-title__text">${value}</span>
    </span>
  `;
}

function fallbackCopyToClipboard(text) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.setAttribute('readonly', '');
  textarea.style.position = 'fixed';
  textarea.style.left = '-9999px';
  document.body.appendChild(textarea);
  textarea.select();
  const copied = document.execCommand('copy');
  textarea.remove();
  if (!copied) throw new Error('Copy command failed');
}

function copyToClipboard(text) {
  if (navigator.clipboard?.writeText) {
    return navigator.clipboard.writeText(text).catch(() => fallbackCopyToClipboard(text));
  }
  fallbackCopyToClipboard(text);
  return Promise.resolve();
}

function initPersonEmailCopy() {
  if (window.__personEmailCopyReady) return;
  window.__personEmailCopyReady = true;
  document.addEventListener('click', event => {
    const button = event.target.closest('.js-copy-person-email');
    if (!button) return;
    event.preventDefault();
    event.stopPropagation();

    const email = button.dataset.email;
    if (!email) return;
    copyToClipboard(email)
      .then(() => showToast('Адрес скопирован'))
      .catch(() => showToast('Не удалось скопировать адрес'));
  });
}

const DEFAULT_QUEUE_LABEL = '\u041a \u0438\u0441\u043f\u043e\u043b\u043d\u0435\u043d\u0438\u044e';
const EMPTY_GROUP_VALUE = '\u0411\u0435\u0437 \u0437\u043d\u0430\u0447\u0435\u043d\u0438\u044f';
const DETAIL_COUNT_EXCLUDED_QUEUES = [
  '\u041e\u0431\u0440\u0430\u0431\u043e\u0442\u0430\u043d\u044b \u043c\u043d\u043e\u0439',
  '\u041d\u0430\u0431\u043b\u044e\u0434\u0430\u044e',
  '\u0418\u043d\u0438\u0446\u0438\u0438\u0440\u043e\u0432\u0430\u043d\u044b \u043c\u043d\u043e\u0439'
];
const STATUS_BADGE_EXCLUDED_KEYS = ['done', 'review', 'initiated'];
const GROUPABLE_ATTRIBUTE_KEYS = ['status', 'assignee', 'author', 'regDate', 'dueDate', 'docType', 'contractor'];

function getCustomGroup(groupId) {
  for (const group of window.customGroups || []) {
    if (group.id === groupId) return group;
    if (group.type === 'bookmark' && Array.isArray(group.groups)) {
      const nestedGroup = group.groups.find(item => item.id === groupId);
      if (nestedGroup) return nestedGroup;
    }
  }

  return null;
}

function taskMatchesNavigation(task, sysId, nav) {
  if (nav.type === 'system' && nav.id !== 'all' && nav.id !== sysId) return false;
  if (nav.type === 'grouped-value' && nav.id !== 'all' && nav.id !== sysId) return false;

  if (nav.type === 'custom-group') {
    return Boolean(getCustomGroup(nav.id)?.taskIds.includes(task.id));
  }

  if (nav.type === 'grouped-value') {
    const value = task[nav.attr];
    if (nav.val === EMPTY_GROUP_VALUE) return value === undefined || value === null || value === '';
    return String(value) === String(nav.val);
  }

  return true;
}

function sortTasksByPriority(a, b) {
  if (a.task.isNew && !b.task.isNew) return -1;
  if (!a.task.isNew && b.task.isNew) return 1;
  if (a.task.isOverdue && !b.task.isOverdue) return -1;
  if (!a.task.isOverdue && b.task.isOverdue) return 1;
  return 0;
}

function updateToolbarForNavigation(nav) {
  const toolbarRight = document.querySelector('.ds-control-panel__right');
  const header = document.querySelector('.app-main__header');
  const headerActions = document.getElementById('js-header-actions');
  const viewSwitcher = document.querySelector('.js-view-switcher');
  const createButton = document.querySelector('.js-btn-create-task');
  const statusTabs = document.querySelector('.js-status-tabs');
  const mainTitle = document.getElementById('js-main-title');
  const downloadButton = document.getElementById('js-download-btn');
  const columnsButton = document.getElementById('js-columns-btn');
  const printButton = document.getElementById('js-print-btn');
  const isCustomView = nav.type === 'custom-group' || (nav.type === 'system' && nav.id?.startsWith('custom-'));

  header?.classList.toggle('is-custom-view', isCustomView);

  if (isCustomView) {
    if (statusTabs) statusTabs.style.display = 'none';
    if (createButton) createButton.style.display = 'none';

    if (headerActions) {
      if (viewSwitcher && viewSwitcher.parentNode !== headerActions) headerActions.appendChild(viewSwitcher);
      if (columnsButton && columnsButton.parentNode !== headerActions) headerActions.appendChild(columnsButton);
      if (downloadButton && downloadButton.parentNode !== headerActions) headerActions.appendChild(downloadButton);
      if (printButton && printButton.parentNode !== headerActions) headerActions.appendChild(printButton);
    }

    const activeSidebarItem = document.querySelector(`.js-sidebar-system.is-active[data-system="${nav.id}"]`);
    if (activeSidebarItem && mainTitle) {
      mainTitle.textContent = activeSidebarItem.querySelector('.nav-label')?.textContent || nav.id;
    }
    return;
  }

  if (statusTabs) statusTabs.style.display = 'flex';
  if (createButton) createButton.style.display = 'inline-flex';

  if (toolbarRight) {
    if (viewSwitcher && viewSwitcher.parentNode === headerActions) toolbarRight.insertBefore(viewSwitcher, toolbarRight.firstChild);
    if (columnsButton && columnsButton.parentNode === headerActions) toolbarRight.insertBefore(columnsButton, createButton);
    if (downloadButton && downloadButton.parentNode === headerActions) toolbarRight.insertBefore(downloadButton, createButton);
    if (printButton && printButton.parentNode === headerActions) toolbarRight.insertBefore(printButton, createButton);
  }
}

function renderSelectionCheckbox(taskId, isSelected) {
  return `
    <div class="ds-selection-checkbox js-task-select ${isSelected ? 'is-checked' : ''}" data-id="${taskId}">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
    </div>
  `;
}

function renderSelectAllCheckbox() {
  return `
    <div class="ds-selection-checkbox js-select-all-table">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
    </div>
  `;
}

function renderTaskStatusTag(task) {
  return `<span class="ds-tag ${task.statusCls}">${task.status}</span>`;
}

function renderColumnHeader(column, nav) {
  const th = document.createElement('th');
  th.className = `ds-table-cell ds-table-cell--header ${column.sticky ? 'ds-table-cell--sticky-left' : ''}`;
  th.setAttribute('data-col', `col-${column.key}`);
  th.style.minWidth = column.width;

  if (column.key === 'cb') {
    th.innerHTML = renderSelectAllCheckbox();
    return th;
  }

  const isGroupedView = ['grouped-value', 'custom-group'].includes(nav.type);
  if (!isGroupedView && GROUPABLE_ATTRIBUTE_KEYS.includes(column.key)) {
    th.innerHTML = `
      <div class="ds-th-content">
        <span class="ds-th-text">${escapeHtml(column.label)}</span>
        <button class="ds-group-icon js-group-trigger" data-attr="${column.key}" title="Группировать" aria-label="Группировать">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M7 8C7 7.44772 7.44772 7 8 7H10C10.5523 7 11 7.44772 11 8V10C11 10.5523 10.5523 11 10 11H8C7.44772 11 7 10.5523 7 10V8Z" fill="currentColor"/>
            <path d="M8 13C7.44772 13 7 13.4477 7 14V16C7 16.5523 7.44772 17 8 17H10C10.5523 17 11 16.5523 11 16V14C11 13.4477 10.5523 13 10 13H8Z" fill="currentColor"/>
            <path d="M13 8C13 7.44772 13.4477 7 14 7H16C16.5523 7 17 7.44772 17 8V10C17 10.5523 16.5523 11 16 11H14C13.4477 11 13 10.5523 13 10V8Z" fill="currentColor"/>
            <path d="M14 13C13.4477 13 13 13.4477 13 14V16C13 16.5523 13.4477 17 14 17H16C16.5523 17 17 16.5523 17 16V14C17 13.4477 16.5523 13 16 13H14Z" fill="currentColor"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M7 3C4.79086 3 3 4.79086 3 7V17C3 19.2091 4.79086 21 7 21H17C19.2091 21 21 19.2091 21 17V7C21 4.79086 19.2091 3 17 3H7ZM17 5H7C5.89543 5 5 5.89543 5 7V17C5 18.1046 5.89543 19 7 19H17C18.1046 19 19 18.1046 19 17V7C19 5.89543 18.1046 5 17 5Z" fill="currentColor"/>
          </svg>
        </button>
      </div>
    `;
  } else {
    th.textContent = column.label;
  }

  return th;
}

function renderTableHeader(columns, nav) {
  const head = document.querySelector('#view-mode-table table.ds-table thead');
  if (!head) return;

  const row = document.createElement('tr');
  columns.forEach(column => row.appendChild(renderColumnHeader(column, nav)));

  head.innerHTML = '';
  head.appendChild(row);
}

function collectVisibleTasks(layout, tabName, nav) {
  const validTasks = [];
  window.__taskDataMap = {};

  Object.keys(layout).forEach(sysId => {
    const count = layout[sysId] || 0;

    for (let index = 0; index < count; index++) {
      const task = generateTask(tabName, sysId, index);
      window.__taskDataMap[task.id] = task;

      if (!taskMatchesNavigation(task, sysId, nav)) continue;
      if (skipFilters(task)) continue;

      validTasks.push({ task, sysId });
    }
  });

  return validTasks.sort(sortTasksByPriority);
}

function renderTableCell(task, sysId, column, columns, isSelected) {
  let value = task[column.key] || '<span class="ds-table-empty-val">–</span>';

  if (column.key === 'cb') value = renderSelectionCheckbox(task.id, isSelected);
  else if (column.key === 'title') value = renderTaskTitle(task.title);
  else if (column.key === 'status') value = renderTaskStatusTag(task);
  else if (column.key === 'sys') value = sysId.toUpperCase();
  else if (column.key === 'author') value = renderPersonCell(task.authorInfo, 'table');
  else if (column.valueType === 'date') value = renderDateValue(task[column.key], isOverdueDateColumn(task, sysId, column.key, columns));

  const isOverdueValue = task.isOverdue && (
    (sysId === 'ecm' && column.key === 'regDate') ||
    (sysId === 'tracker' && column.key === 'dueDate') ||
    (sysId === 'control' && column.key === 'checkDate') ||
    (sysId === 'control' && column.key === 'regDate' && columns.some(item => item.key === 'sys'))
  );

  if (isOverdueValue && column.valueType !== 'date') {
    value = `<span class="ds-task-date ds-task-date--alert">${value}</span>`;
  }

  const dateClass = column.valueType === 'date' ? 'ds-table-cell--date' : '';
  const stickyClass = column.sticky ? 'ds-table-cell--sticky-left' : '';
  const titleStyle = column.key === 'title'
    ? ` style="width: ${column.width}; min-width: ${column.width}; max-width: ${column.width};"`
    : '';

  return `<td class="ds-table-cell ${dateClass} ${stickyClass}" data-col="col-${column.key}"${titleStyle}>${value}</td>`;
}

function getTaskSearchText(task) {
  return escapeHtml(`${task.id} ${task.title} ${task.author || ''} ${task.authorInfo?.email || ''}`);
}

function renderTaskTableRow(task, sysId, columns) {
  const isSelected = window.selectedTaskIds.has(task.id);
  const cells = columns.map(column => renderTableCell(task, sysId, column, columns, isSelected)).join('');
  const searchText = getTaskSearchText(task);

  return `<tr class="ds-table-row ${isSelected ? 'is-selected' : ''} ${task.isOverdue ? 'is-overdue' : ''} ${task.isNew ? 'is-new' : ''}" data-id="${task.id}" data-search="${searchText}">${cells}</tr>`;
}

function renderTaskCard(task, sysId) {
  const isSelected = window.selectedTaskIds.has(task.id);
  const searchText = getTaskSearchText(task);
  const cardDate = task.isOverdue && sysId === 'tracker'
    ? task.dueDate
    : (task.isOverdue && sysId === 'control' ? task.checkDate : task.regDate);

  return `
    <div class="ds-task-row ${isSelected ? 'is-selected' : ''} ${task.isOverdue ? 'is-overdue' : ''} ${task.isNew ? 'is-new' : ''}" data-id="${task.id}" data-search="${searchText}">
      ${renderSelectionCheckbox(task.id, isSelected)}
      <div class="ds-task-row__main">
        <span class="ds-task-row__id">${task.id}</span>
        <span class="ds-task-row__name">${renderTaskTitle(task.title)}</span>
      </div>
      <div class="ds-task-row__meta">
        ${renderTaskStatusTag(task)}
        ${renderPersonCell(task.authorInfo, 'card')}
        <span class="ds-task-row__date">${renderDateValue(cardDate, task.isOverdue)}</span>
      </div>
    </div>
  `;
}

function updateDetailedCount(tabName, total) {
  const detailedCount = document.getElementById('detailed-count');
  if (!detailedCount) return;

  detailedCount.textContent = DETAIL_COUNT_EXCLUDED_QUEUES.includes(tabName) ? '' : `${total} задач`;
}

export function initOverviewTabs() {
  initPersonEmailCopy();
  const tabs = document.querySelectorAll('.js-overview-tab');
  const cardList = document.getElementById('js-main-task-list');

  window.renderTab = function(tabName, preservePage = false) {
    const layout = MOCK_LAYOUTS[tabName];
    if (!layout) return;

    const nav = window.navigationContext || { type: 'all', id: 'all' };
    const columns = getActiveColumns(nav.id);

    updateToolbarForNavigation(nav);
    renderTableHeader(columns, nav);

    const validTasks = collectVisibleTasks(layout, tabName, nav);
    const total = validTasks.length;
    const pagination = paginateItems(validTasks, window.paginationState, preservePage);
    window.paginationState = pagination.state;

    const tableHtml = pagination.pageItems
      .map(({ task, sysId }) => renderTaskTableRow(task, sysId, columns))
      .join('');
    const cardHtml = pagination.pageItems
      .map(({ task, sysId }) => renderTaskCard(task, sysId))
      .join('');

    if (cardList) {
      cardList.innerHTML = cardHtml || EMPTY_STATE_HTML;
    }

    const body = document.getElementById('js-unified-table-body');
    if (body) {
      if (tableHtml) {
        body.innerHTML = tableHtml;
      } else {
        const colCount = columns.length || 12;
        body.innerHTML = `<tr class="ds-table-empty-row"><td colspan="${colCount}">${EMPTY_STATE_HTML}</td></tr>`;
      }
    }

    updateDetailedCount(tabName, total);
    renderPaginationControls(pagination.totalPages, window.paginationState.current, total, tabName);
    updateTabsFilterBadges();

    window.dispatchEvent(new CustomEvent('table-rendered'));
  }

  tabs.forEach(tab => tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('is-active'));
    tab.classList.add('is-active');

    const statusKey = tab.getAttribute('data-status');
    window.renderTab(REVERSE_STATUS_MAP[statusKey] || DEFAULT_QUEUE_LABEL);
    updateSidebarCounts();
  }));
}



export function updateTabsFilterBadges() {
  const nav = window.navigationContext || { type: 'all', id: 'all' };

  document.querySelectorAll('.js-status-tabs .js-overview-tab').forEach(tab => {
    const statusKey = tab.getAttribute('data-status');
    const queueLabel = REVERSE_STATUS_MAP[statusKey];
    const layout = MOCK_LAYOUTS[queueLabel];
    if (!layout) return;

    let count = 0;
    let hasOverdue = false;
    const isTodoQueue = statusKey === 'todo';

    Object.keys(layout).forEach(sysId => {
      const max = layout[sysId] || 0;

      for (let index = 0; index < max; index++) {
        const task = generateTask(queueLabel, sysId, index);
        if (!taskMatchesNavigation(task, sysId, nav)) continue;
        if (skipFilters(task)) continue;

        count++;
        if (isTodoQueue && task.isOverdue) hasOverdue = true;
      }
    });

    const badge = tab.querySelector('.ds-tab__badge');
    if (!badge) return;

    if (STATUS_BADGE_EXCLUDED_KEYS.includes(statusKey)) {
      badge.style.display = 'none';
      return;
    }

    badge.style.display = 'inline-flex';
    badge.textContent = count;
    badge.style.opacity = count === 0 ? '0.5' : '1';
    badge.classList.toggle('is-overdue', count > 0 && hasOverdue);
  });
}
