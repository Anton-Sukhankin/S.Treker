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
