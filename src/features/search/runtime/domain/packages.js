export function getBranchIds(nodeId, nodes) {
        const ids = [nodeId];

        const findAndCollect = (list) => {
            for (const node of list) {
                if (node.id === nodeId) {
                    if (node.children) {
                        const collect = (childNode) => {
                            ids.push(childNode.id);
                            if (childNode.children) childNode.children.forEach(collect);
                        };
                        node.children.forEach(collect);
                    }
                    return true;
                }
                if (node.children && findAndCollect(node.children)) return true;
            }
            return false;
        };

        findAndCollect(nodes);
        return ids;
    }

    export function checkMatchRecursive(nodes, query) {
        return nodes.some(node =>
            node.name.toLowerCase().includes(query.toLowerCase()) ||
            (node.children && checkMatchRecursive(node.children, query))
        );
    }

    export function findPackagePath(id, nodes, path = []) {
        for (const node of nodes) {
            const currentPath = [...path, node.name];
            if (node.id === id) return currentPath.join(' / ');
            if (node.children) {
                const found = findPackagePath(id, node.children, currentPath);
                if (found) return found;
            }
        }
        return null;
    }

    export function findPackageById(id, nodes) {
        for (const node of nodes) {
            if (node.id === id) return node;
            if (node.children) {
                const found = findPackageById(id, node.children);
                if (found) return found;
            }
        }
        return null;
    }
