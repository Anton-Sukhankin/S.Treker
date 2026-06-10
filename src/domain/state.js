import { createDefaultFilters } from './filters.js';

export function initializeAppState(target = window) {
  target.navigationContext = { type: 'all', id: 'all' };
  target.selectedTaskIds = new Set();
  target.customGroups = [];
  target.generatedGroups = [];
  target.activeFilters = createDefaultFilters();
}
