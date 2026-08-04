import {
  ALL_DOCUMENT_TYPES,
  DOCUMENT_NAME_TEMPLATES,
  DOCUMENT_TYPES,
} from '../data/documents-workspace-mock.js';

export function hashDocumentSeed(value) {
  return [...String(value ?? '')].reduce(
    (result, character) => (result * 31 + character.charCodeAt(0)) >>> 0,
    7,
  );
}

export function getPackageDocuments({
  packageId,
  packageName = 'Документы',
  includeNested = false,
  additionalDocuments = [],
} = {}) {
  if (!packageId) return [];

  const seed = hashDocumentSeed(packageId);
  const count = 48 + seed % 17 + (includeNested ? 18 : 0);
  const documents = Array.from({ length: count }, (_, index) => {
    const type = DOCUMENT_TYPES[(index + seed) % DOCUMENT_TYPES.length];
    const day = String(index % 28 + 1).padStart(2, '0');
    const month = String((index * 3 + seed) % 12 + 1).padStart(2, '0');
    const changedDay = String(index % 27 + 2).padStart(2, '0');
    const template = DOCUMENT_NAME_TEMPLATES[index % DOCUMENT_NAME_TEMPLATES.length];
    const name = index === 0
      ? 'Партнерское соглашение (для prod)- ОТ 2026-04-09-СФ-42-К-26-PS'
      : `${template}${index % 6 === 0 ? ` — ${packageName}` : ''}`;

    return Object.freeze({
      id: `${packageId}-document-${index + 1}`,
      name,
      number: index === 0
        ? 'СФ-42-К-26-PS'
        : `${String(seed % 90 + 10)}-${String(index + 1).padStart(3, '0')}/26`,
      type,
      date: index === 0 ? '09.04.2026' : `${day}.${month}.2026`,
      version: index % 8 === 0 ? 3 : index % 4 === 0 ? 2 : 1,
      changed: index === 0 ? '09.04.2026' : `${changedDay}.${month}.2026`,
    });
  });

  const createdDocuments = (Array.isArray(additionalDocuments) ? additionalDocuments : [])
    .filter(document => document?.packageId === packageId);

  return Object.freeze([...createdDocuments, ...documents]);
}

export function filterDocumentsByType(documents, typeFilter = ALL_DOCUMENT_TYPES) {
  const sourceDocuments = Array.isArray(documents) ? documents : [];
  if (typeFilter === ALL_DOCUMENT_TYPES) return [...sourceDocuments];
  return sourceDocuments.filter(document => document.type === typeFilter);
}

export function sortDocumentsByName(documents, ascending = true) {
  const direction = ascending ? 1 : -1;
  return [...(Array.isArray(documents) ? documents : [])].sort(
    (first, second) => direction * first.name.localeCompare(second.name, 'ru'),
  );
}

export function paginateDocuments(documents, { currentPage = 1, pageSize = 25 } = {}) {
  const sourceDocuments = Array.isArray(documents) ? documents : [];
  const normalizedPageSize = Number.isFinite(Number(pageSize)) && Number(pageSize) > 0
    ? Math.floor(Number(pageSize))
    : 25;
  const totalCount = sourceDocuments.length;
  const totalPages = Math.max(1, Math.ceil(totalCount / normalizedPageSize));
  const requestedPage = Number.isFinite(Number(currentPage)) ? Math.floor(Number(currentPage)) : 1;
  const normalizedCurrentPage = Math.min(Math.max(1, requestedPage), totalPages);
  const pageStart = (normalizedCurrentPage - 1) * normalizedPageSize;
  const pageEnd = Math.min(pageStart + normalizedPageSize, totalCount);

  return {
    pageDocuments: sourceDocuments.slice(pageStart, pageEnd),
    totalCount,
    totalPages,
    currentPage: normalizedCurrentPage,
    pageSize: normalizedPageSize,
    pageStart,
    pageEnd,
  };
}

export function getVisibleDocumentPages(currentPage, totalPages) {
  const normalizedTotalPages = Math.max(1, Math.floor(Number(totalPages) || 1));
  const normalizedCurrentPage = Math.min(
    Math.max(1, Math.floor(Number(currentPage) || 1)),
    normalizedTotalPages,
  );

  if (normalizedTotalPages <= 7) {
    return Array.from({ length: normalizedTotalPages }, (_, index) => index + 1);
  }
  if (normalizedCurrentPage <= 3) {
    return [1, 2, 3, 4, 'ellipsis', normalizedTotalPages];
  }
  if (normalizedCurrentPage >= normalizedTotalPages - 2) {
    return [
      1,
      'ellipsis',
      normalizedTotalPages - 3,
      normalizedTotalPages - 2,
      normalizedTotalPages - 1,
      normalizedTotalPages,
    ];
  }
  return [
    1,
    'ellipsis',
    normalizedCurrentPage - 1,
    normalizedCurrentPage,
    normalizedCurrentPage + 1,
    'ellipsis',
    normalizedTotalPages,
  ];
}

export function createDocumentsTableSnapshot({
  packageId,
  packageName = 'Документы',
  includeNested = false,
  typeFilter = ALL_DOCUMENT_TYPES,
  sortAscending = true,
  currentPage = 1,
  pageSize = 25,
  additionalDocuments = [],
} = {}) {
  const allDocuments = getPackageDocuments({
    packageId,
    packageName,
    includeNested,
    additionalDocuments,
  });
  const documents = sortDocumentsByName(
    filterDocumentsByType(allDocuments, typeFilter),
    sortAscending,
  );
  const pagination = paginateDocuments(documents, { currentPage, pageSize });

  return {
    packageId: packageId ?? null,
    packageName,
    includeNested: Boolean(includeNested),
    typeFilter,
    typeOptions: [ALL_DOCUMENT_TYPES, ...DOCUMENT_TYPES],
    sortAscending: Boolean(sortAscending),
    allDocuments,
    documents,
    ...pagination,
  };
}
