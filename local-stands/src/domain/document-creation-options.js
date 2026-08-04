const VALID_SOURCES = new Set(['ecm', 'lego']);

function normalizeSearchValue(value) {
  return String(value ?? '').trim().toLocaleLowerCase('ru');
}

export function getAvailableDocumentCreationOptions(options = []) {
  return (Array.isArray(options) ? options : []).filter(option => (
    option
    && VALID_SOURCES.has(option.source)
    && option.available !== false
    && (option.source !== 'lego' || option.published === true)
  ));
}

export function filterDocumentCreationOptions(options = [], query = '') {
  const availableOptions = getAvailableDocumentCreationOptions(options);
  const normalizedQuery = normalizeSearchValue(query);
  if (!normalizedQuery) return availableOptions;

  return availableOptions.filter(option => normalizeSearchValue([
    option.name,
    option.sourceLabel,
    option.documentTypeLabel,
  ].join(' ')).includes(normalizedQuery));
}

export function findDocumentCreationOption(options = [], optionId) {
  return getAvailableDocumentCreationOptions(options)
    .find(option => option.id === optionId) ?? null;
}

export function createDocumentFromCreationResult({
  id,
  packageId,
  option,
  values = {},
  date,
} = {}) {
  if (!id || !packageId || !option) return null;
  const name = String(values.name ?? option.name).trim();
  if (!name) return null;

  return Object.freeze({
    id,
    packageId,
    name,
    number: String(values.number ?? '').trim() || `NEW-${String(id).slice(-6)}`,
    type: option.documentTypeLabel || 'Договор',
    date,
    version: 1,
    changed: date,
    source: option.source,
    creationOptionId: option.id,
    documentTypeId: option.documentTypeId,
    templateVersionId: option.templateVersionId ?? null,
  });
}
