import './styles/main.css';
import { initAttributeLibrary } from './data/attributes.js';
import { REVERSE_STATUS_MAP } from './data/statuses.js';
import { initializeAppState } from './domain/state.js';
import { initGlobalSearch, initViewSwitcher, initSidebarResize, initSidebarAccordions, initFloatingTableHeader, initSystemOverlay, initPrintAction, initTableScrollShadow } from './ui/basic-controls.js';
import { showToast } from './ui/toast.js';
import { initColumnsDrawer } from './features/columns/columns-drawer.js';
import { initFilterDrawer } from './features/filters/filter-drawer.js';
import { initMultiSelect } from './features/filters/multi-select.js';
import { initGroupingControls } from './features/grouping/grouping-controls.js';
import { initFloatingActionBar, initTaskSelection } from './features/task-selection/floating-action-bar.js';
import { initSidebarNavigation, updateSidebarCounts } from './features/sidebar/sidebar.js';
import { initOverviewTabs } from './features/tasks/tasks-view.js';

initializeAppState();

document.addEventListener('DOMContentLoaded', () => {
  initOverviewTabs();
  initSidebarNavigation();
  initViewSwitcher();
  initFilterDrawer({ updateSidebarCounts, reverseStatusMap: REVERSE_STATUS_MAP });
  initTaskSelection();
  initSidebarResize();
  initSidebarAccordions();
  initGlobalSearch();
  initFloatingActionBar({ updateSidebarCounts, reverseStatusMap: REVERSE_STATUS_MAP });
  initFloatingTableHeader();
  initPrintAction({ showToast });
  initTableScrollShadow();

  initSystemOverlay();
  initMultiSelect();
  initColumnsDrawer({ updateSidebarCounts, reverseStatusMap: REVERSE_STATUS_MAP });
  initGroupingControls({ updateSidebarCounts });
  initAttributeLibrary();

  const activeTab = document.querySelector('.js-status-tabs .js-overview-tab.is-active');
  if (activeTab && typeof window.renderTab === 'function') {
    const statusKey = activeTab.getAttribute('data-status') || 'todo';
    const statusLabel = REVERSE_STATUS_MAP[statusKey] || REVERSE_STATUS_MAP.todo;
    window.renderTab(statusLabel);
  }

  updateSidebarCounts();
});
