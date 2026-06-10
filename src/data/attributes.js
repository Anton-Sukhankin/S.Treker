import {
  getDefaultDomainAttributes,
  getDomainAttributeLibrary,
  getNavigationAttributeLibrary
} from '../domain/task-selectors.js';

export const ATTRIBUTE_MAP = {
  ecm: getDefaultDomainAttributes('ecm'),
  tracker: getDefaultDomainAttributes('tracker'),
  control: getDefaultDomainAttributes('control')
};

export const LIBRARY_ATTRIBUTES = {
  ecm: getDomainAttributeLibrary('ecm'),
  tracker: getDomainAttributeLibrary('tracker'),
  control: getDomainAttributeLibrary('control')
};

export const ORIGINAL_ATTRIBUTE_MAP = JSON.parse(JSON.stringify(ATTRIBUTE_MAP));

export function initAttributeLibrary() {
  window.getAttributeLibrary = (system) => {
    if (system === 'all') return getNavigationAttributeLibrary('all');
    return getDomainAttributeLibrary(system);
  };
}
