export function ensurePaginationState(state, preservePage, pageSize = 20) {
  if (!state || !preservePage) {
    return { current: 1, pageSize };
  }
  return state;
}

export function paginateItems(items, state, preservePage = false) {
  const resolvedState = ensurePaginationState(state, preservePage);
  const totalPages = Math.ceil(items.length / resolvedState.pageSize);

  if (totalPages === 0) {
    resolvedState.current = 1;
  } else if (resolvedState.current > totalPages) {
    resolvedState.current = totalPages;
  }

  const startIdx = (resolvedState.current - 1) * resolvedState.pageSize;
  return {
    state: resolvedState,
    totalPages,
    pageItems: items.slice(startIdx, startIdx + resolvedState.pageSize)
  };
}

export function getPaginationItems(totalPages, current) {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  if (current <= 3) return [1, 2, 3, 4, '...', totalPages];
  if (current >= totalPages - 2) return [1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
  return [1, '...', current - 1, current, current + 1, '...', totalPages];
}
