const normalizeNodes = nodes => Array.isArray(nodes) ? nodes : [];

export function normalizePackageQuery(query) {
  return String(query ?? '').trim().toLocaleLowerCase('ru');
}

export function packageNodeContains(node, query) {
  const normalizedQuery = normalizePackageQuery(query);
  if (!normalizedQuery || !node) return Boolean(node);
  return node.name.toLocaleLowerCase('ru').includes(normalizedQuery)
    || Boolean(node.children?.some(child => packageNodeContains(child, normalizedQuery)));
}

export function filterPackageTree(nodes, query) {
  const sourceNodes = normalizeNodes(nodes);
  const normalizedQuery = normalizePackageQuery(query);
  if (!normalizedQuery) return sourceNodes;

  return sourceNodes
    .filter(node => packageNodeContains(node, normalizedQuery))
    .map(node => ({
      ...node,
      children: node.children ? filterPackageTree(node.children, normalizedQuery) : undefined,
    }));
}

export function collectExpandedPackageIds(nodes, query) {
  const normalizedQuery = normalizePackageQuery(query);
  const expandedIds = new Set();
  if (!normalizedQuery) return expandedIds;

  const visit = currentNodes => {
    normalizeNodes(currentNodes).forEach(node => {
      if (node.children?.some(child => packageNodeContains(child, normalizedQuery))) {
        expandedIds.add(node.id);
        visit(node.children);
      }
    });
  };

  visit(nodes);
  return expandedIds;
}

export function findPackageById(nodes, packageId) {
  for (const node of normalizeNodes(nodes)) {
    if (node.id === packageId) return node;
    const nested = findPackageById(node.children, packageId);
    if (nested) return nested;
  }
  return null;
}

export function findPackagePath(nodes, packageId, parentPath = []) {
  for (const node of normalizeNodes(nodes)) {
    const path = [...parentPath, node];
    if (node.id === packageId) return path;
    const nested = findPackagePath(node.children, packageId, path);
    if (nested) return nested;
  }
  return null;
}

export function getPackageBreadcrumbs(nodes, packageId) {
  return (findPackagePath(nodes, packageId) ?? []).filter(node => node.name !== '.');
}

export function collectDescendantPackageIds(nodes, packageId, { includeSelf = false } = {}) {
  const packageNode = findPackageById(nodes, packageId);
  if (!packageNode) return [];

  const ids = includeSelf ? [packageNode.id] : [];
  const visit = node => {
    normalizeNodes(node.children).forEach(child => {
      ids.push(child.id);
      visit(child);
    });
  };
  visit(packageNode);
  return ids;
}

export function renamePackage(nodes, packageId, name) {
  const normalizedName = String(name ?? '').trim();
  if (!normalizedName) return normalizeNodes(nodes);

  return normalizeNodes(nodes).map(node => ({
    ...node,
    name: node.id === packageId ? normalizedName : node.name,
    children: node.children ? renamePackage(node.children, packageId, normalizedName) : undefined,
  }));
}

export function appendPackage(nodes, parentId, child) {
  if (!child?.id || !String(child.name ?? '').trim()) return normalizeNodes(nodes);

  const normalizedChild = {
    ...child,
    name: String(child.name).trim(),
  };

  return normalizeNodes(nodes).map(node => {
    if (node.id === parentId) {
      return {
        ...node,
        children: [...(node.children ?? []), normalizedChild],
      };
    }
    return {
      ...node,
      children: node.children ? appendPackage(node.children, parentId, normalizedChild) : undefined,
    };
  });
}

export function toggleExpandedPackageId(expandedIds, packageId) {
  const nextIds = new Set(expandedIds ?? []);
  if (nextIds.has(packageId)) nextIds.delete(packageId);
  else nextIds.add(packageId);
  return nextIds;
}
