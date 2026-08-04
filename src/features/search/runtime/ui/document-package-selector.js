function getElement(ref) {
        if (!ref) return null;
        if (typeof ref === 'string') return document.getElementById(ref);
        return ref;
    }

    function clearNode(node) {
        while (node?.firstChild) {
            node.removeChild(node.firstChild);
        }
    }

    function createStructItem(type) {
        const item = document.createElement('div');
        item.className = `tree-struct-item ${type}`;
        return item;
    }

    function createIcon(name, className, styles = {}) {
        const icon = document.createElement('i');
        icon.dataset.lucide = name;
        if (className) icon.className = className;
        Object.assign(icon.style, styles);
        return icon;
    }

export function createDocumentPackageSelectorController(options) {
        const selectedPackageIds = new Set();
        const expandedNodeIds = new Set();

        function getTreeContainer() {
            return getElement(options.treeContainerId);
        }

        function getApplyButton() {
            return getElement(options.applyButtonId);
        }

        function syncApplyButton() {
            const applyButton = getApplyButton();
            if (!applyButton) return;

            applyButton.type = 'button';
            const disabled = selectedPackageIds.size === 0;
            applyButton.disabled = disabled;
            applyButton.classList.toggle('disabled', disabled);
        }

        function renderTree(nodes = options.treeData || [], container = getTreeContainer(), level = 0, ancestors = []) {
            if (!container) return;
            if (level === 0) clearNode(container);

            nodes.forEach((node, index) => {
                const isLast = index === nodes.length - 1;
                const isExpanded = expandedNodeIds.has(node.id);
                const isSelected = selectedPackageIds.has(node.id);

                const nodeWrapper = document.createElement('div');
                nodeWrapper.className = 'tree-node';
                nodeWrapper.classList.toggle('expanded', isExpanded);

                const row = document.createElement('div');
                row.className = 'tree-node-row';
                row.classList.toggle('active', isSelected);

                const inner = document.createElement('div');
                inner.className = 'tree-node-inner';
                inner.style.cursor = 'pointer';

                const checkboxContainer = document.createElement('div');
                checkboxContainer.className = 'tree-checkbox-container';
                Object.assign(checkboxContainer.style, {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '24px'
                });

                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.className = 'esm-checkbox';
                checkbox.checked = isSelected;
                checkbox.setAttribute('aria-label', `Выбрать пакет «${node.name}»`);

                checkboxContainer.appendChild(checkbox);

                const content = document.createElement('div');
                content.className = 'tree-content-area';

                for (let i = 0; i < level; i++) {
                    content.appendChild(createStructItem(ancestors[i] === 'line' ? 'tree-struct-line' : 'tree-struct-empty'));
                }

                if (level > 0) {
                    content.appendChild(createStructItem(isLast ? 'tree-struct-branch-end' : 'tree-struct-branch'));
                }

                const folderIconName = node.children ? (isExpanded ? 'folder-minus' : 'folder-plus') : 'folder';
                const folderIcon = createIcon(folderIconName, 'tree-folder-icon', {
                    width: '18px',
                    height: '18px',
                    color: node.children ? 'var(--accent)' : '#888'
                });

                if (node.children) {
                    const folderButton = document.createElement('button');
                    folderButton.type = 'button';
                    folderButton.dataset.packageId = node.id;
                    folderButton.setAttribute('aria-label', `${isExpanded ? 'Свернуть' : 'Развернуть'} пакет «${node.name}»`);
                    folderButton.setAttribute('aria-expanded', String(isExpanded));
                    Object.assign(folderButton.style, {
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '0',
                        border: '0',
                        background: 'transparent',
                        cursor: 'pointer'
                    });
                    folderButton.appendChild(folderIcon);
                    folderButton.addEventListener('click', event => {
                        event.stopPropagation();
                        if (expandedNodeIds.has(node.id)) {
                            expandedNodeIds.delete(node.id);
                        } else {
                            expandedNodeIds.add(node.id);
                        }
                        renderTree();
                        Array.from(getTreeContainer()?.querySelectorAll('button[data-package-id]') || [])
                            .find(button => button.dataset.packageId === String(node.id))
                            ?.focus();
                    });
                    content.appendChild(folderButton);
                } else {
                    folderIcon.setAttribute('aria-hidden', 'true');
                    content.appendChild(folderIcon);
                }

                const label = document.createElement('span');
                label.className = 'tree-node-label';
                label.textContent = node.name;
                content.appendChild(label);

                inner.appendChild(checkboxContainer);
                inner.appendChild(content);
                row.appendChild(inner);

                function setSelected(selected) {
                    if (selected) selectedPackageIds.add(node.id);
                    else selectedPackageIds.delete(node.id);

                    checkbox.checked = selected;
                    row.classList.toggle('active', selected);
                    syncApplyButton();
                }

                checkbox.addEventListener('click', event => {
                    event.stopPropagation();
                });

                checkbox.addEventListener('change', () => {
                    setSelected(checkbox.checked);
                });

                row.addEventListener('click', event => {
                    event.stopPropagation();
                    if (event.target.closest('button') || event.target === checkbox) return;
                    setSelected(!selectedPackageIds.has(node.id));
                });

                nodeWrapper.appendChild(row);

                if (node.children && isExpanded) {
                    const childrenContainer = document.createElement('div');
                    childrenContainer.className = 'tree-children';
                    renderTree(node.children, childrenContainer, level + 1, [...ancestors, isLast ? 'empty' : 'line']);
                    nodeWrapper.appendChild(childrenContainer);
                }

                container.appendChild(nodeWrapper);
            });

            if (level === 0) {
                options.onCreateIcons?.();
            }
        }

        function reset() {
            selectedPackageIds.clear();
            syncApplyButton();
        }

        return Object.freeze({
            render: () => renderTree(),
            reset,
            getSelectedIds: () => Array.from(selectedPackageIds)
        });
    }
