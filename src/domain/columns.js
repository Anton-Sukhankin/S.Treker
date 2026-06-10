import {
  getColumnByKey,
  getDefaultDomainAttributes,
  getNavigationAttributeLibrary,
  getUnionDomainAttributes,
  getVisibleBusinessDomainIds
} from './task-selectors.js';

const FIXED_COLUMN_KEYS = ['cb', 'id', 'title'];

function cloneColumns(columns) {
  return columns.map(column => ({ ...column }));
}

function getDefaultColumns(navId) {
  const visibleDomainIds = getVisibleBusinessDomainIds();
  if (navId === 'all' || !visibleDomainIds.includes(navId)) return getUnionAttributes();
  return getDefaultDomainAttributes(navId);
}

function getValidColumnKeys(navId) {
  return new Set([
    ...getDefaultColumns(navId).map(column => column.key),
    ...getLibraryAttributesForNavigation(navId).map(column => column.key)
  ]);
}

export function normalizeColumnState(navId, state) {
  if (!Array.isArray(state)) return null;

  const validKeys = getValidColumnKeys(navId);
  const seen = new Set();
  const normalized = [];

  state.forEach(item => {
    if (!item || typeof item.key !== 'string') return;
    if (FIXED_COLUMN_KEYS.includes(item.key)) return;
    if (!validKeys.has(item.key)) return;
    if (seen.has(item.key)) return;
    seen.add(item.key);
    normalized.push({ key: item.key, visible: item.visible !== false });
  });

  return normalized;
}

export function repairColumnState(navId) {
  if (!window.customColumnState || !Object.prototype.hasOwnProperty.call(window.customColumnState, navId)) return;
  const normalized = normalizeColumnState(navId, window.customColumnState[navId]);
  if (normalized && normalized.length > 0) {
    window.customColumnState[navId] = normalized;
  } else {
    delete window.customColumnState[navId];
  }
}

function withColumnsFromState(navId, columns) {
  repairColumnState(navId);
  const state = window.customColumnState?.[navId] || [];
  const keys = new Set(columns.map(column => column.key));
  const next = [...columns];

  state.forEach(item => {
    if (keys.has(item.key)) return;
    const attr = getColumnByKey(navId, item.key);
    if (!attr) return;
    next.push(attr);
    keys.add(item.key);
  });

  return next;
}

export function getUnionAttributes() {
  return getUnionDomainAttributes();
}

export function getBaseColumnsForSettings(navId) {
  return withColumnsFromState(navId, getDefaultColumns(navId));
}

export function getDefaultColumnsForSettings(navId) {
  return cloneColumns(getDefaultColumns(navId));
}

export function getConfigurableDefaultColumns(navId) {
  return getDefaultColumns(navId).filter(column => !FIXED_COLUMN_KEYS.includes(column.key));
}

export function getLibraryAttributesForNavigation(navId) {
  return getNavigationAttributeLibrary(navId);
}

export function isLibraryColumn(navId, key) {
  if (FIXED_COLUMN_KEYS.includes(key)) return false;
  return getLibraryAttributesForNavigation(navId).some(attr => attr.key === key);
}

export function getActiveColumns(navId) {
  repairColumnState(navId);
  const baseCols = withColumnsFromState(navId, getDefaultColumns(navId));
  const state = window.customColumnState?.[navId];

  if (state) {
    const stateMap = {};
    state.forEach((st, i) => { stateMap[st.key] = { order: i, visible: st.visible }; });

    const ordered = [];
    FIXED_COLUMN_KEYS.forEach(key => {
      const fixed = baseCols.find(column => column.key === key);
      if (fixed) ordered.push(fixed);
    });

    const configurable = baseCols.filter(column => !FIXED_COLUMN_KEYS.includes(column.key));
    configurable.sort((a, b) => {
      const aOrder = stateMap[a.key] !== undefined ? stateMap[a.key].order : 999;
      const bOrder = stateMap[b.key] !== undefined ? stateMap[b.key].order : 999;
      return aOrder - bOrder;
    });

    configurable.forEach(column => {
      if (stateMap[column.key] === undefined || stateMap[column.key].visible) ordered.push(column);
    });

    return cloneColumns(ordered);
  }

  return cloneColumns(baseCols);
}
