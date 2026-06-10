const COMMON_FILTER_KEYS = ['search', 'id', 'title'];

const DOMAIN_FILTER_KEYS = {
  ecm: ['docType', 'contractor', 'sum'],
  tracker: ['unit', 'sla'],
  control: ['object', 'criticality']
};

function getActiveDomainId() {
  const nav = window.navigationContext || { type: 'all', id: 'all' };
  if ((nav.type === 'system' || nav.type === 'grouped-value') && nav.id && nav.id !== 'all') return nav.id;
  return 'all';
}

function filterAppliesToContext(key) {
  const activeDomainId = getActiveDomainId();
  if (activeDomainId === 'all') return true;
  return COMMON_FILTER_KEYS.includes(key) || DOMAIN_FILTER_KEYS[activeDomainId]?.includes(key);
}

function isEmptyFilter(value) {
  if (Array.isArray(value)) return value.length === 0;
  if (value && typeof value === 'object') return value.from === null && value.to === null;
  return value === undefined || value === null || value === '';
}

function getComparableTaskValue(task, key) {
  if (key === 'search') {
    return Object.values(task)
      .filter(value => value !== undefined && value !== null && typeof value !== 'object')
      .join(' ');
  }
  return task[key];
}

function matchesListFilter(taskValue, selectedValues) {
  return selectedValues.some(value => String(value) === String(taskValue));
}

function matchesRangeFilter(taskValue, filterValue) {
  if (taskValue === undefined || taskValue === null || taskValue === '') return false;
  const value = parseFloat(taskValue);
  if (Number.isNaN(value)) return false;
  if (filterValue.from !== null && value < filterValue.from) return false;
  if (filterValue.to !== null && value > filterValue.to) return false;
  return true;
}

export function createDefaultFilters() {
  return {
    search: '',
    id: [],
    title: [],
    docType: [],
    contractor: [],
    sum: { from: null, to: null },
    regDate: { from: null, to: null },
    unit: [],
    sla: [],
    dueDate: { from: null, to: null },
    object: [],
    criticality: []
  };
}

export function resetFilters(filters) {
  const fresh = createDefaultFilters();
  Object.keys(fresh).forEach(key => {
    filters[key] = fresh[key];
  });
  Object.keys(filters).forEach(key => {
    if (!(key in fresh)) delete filters[key];
  });
  return filters;
}

export function taskPassesFilters(task, options = {}) {
  const filters = options.filters || window.activeFilters;
  const ignoreKey = options.ignoreKey;
  if (!filters) return true;

  return Object.entries(filters).every(([key, filterValue]) => {
    if (key === ignoreKey || isEmptyFilter(filterValue)) return true;
    if (!filterAppliesToContext(key)) return true;
    const taskValue = getComparableTaskValue(task, key);

    if (Array.isArray(filterValue)) {
      return matchesListFilter(taskValue, filterValue);
    }

    if (filterValue && typeof filterValue === 'object') {
      return matchesRangeFilter(taskValue, filterValue);
    }

    return String(taskValue || '').toLowerCase().includes(String(filterValue).toLowerCase());
  });
}

export function skipFilters(task) {
  return !taskPassesFilters(task);
}
