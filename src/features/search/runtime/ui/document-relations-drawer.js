let menuId = 0;

    function createIcon(name, className, styles = {}) {
        const icon = document.createElement('i');
        icon.dataset.lucide = name;
        if (className) icon.className = className;
        Object.assign(icon.style, styles);
        return icon;
    }

    function createMenuItem(options) {
        const item = document.createElement('button');
        item.type = 'button';
        item.className = `menu-item${options.className ? ` ${options.className}` : ''}`;
        Object.assign(item.style, {
            width: '100%',
            border: '0',
            background: 'transparent',
            fontFamily: 'inherit',
            textAlign: 'left'
        });
        item.appendChild(createIcon(options.icon));

        const label = document.createElement('span');
        label.textContent = options.label;
        item.appendChild(label);

        return item;
    }

    function createDivider() {
        const divider = document.createElement('div');
        divider.className = 'menu-divider';
        return divider;
    }

    function createTextCell(text) {
        const cell = document.createElement('td');
        cell.textContent = text || '';
        return cell;
    }

    function resetSortHeaders(headers) {
        headers.forEach(header => {
            header.removeAttribute('data-sort-dir');
            header.setAttribute('aria-sort', 'none');
            const icon = header.querySelector('.sort-icon');
            if (!icon) return;
            icon.setAttribute('data-lucide', header.dataset.sort === 'name' ? 'arrow-down-a-z' : 'arrow-down');
        });
    }

export function createDocumentRelationsDrawerController(options) {
        const overlay = document.getElementById(options.overlayId);
        const drawer = document.getElementById(options.drawerId);
        const title = drawer?.querySelector('.drawer-title') || null;
        const subtitle = document.getElementById(options.subtitleId);
        const iconContainer = document.getElementById(options.iconContainerId);
        const tableBody = document.getElementById(options.tableBodyId);
        const tableHead = document.querySelector(`#${options.tableId} thead`);
        const selectAll = document.querySelector(options.selectAllSelector);
        selectAll?.setAttribute('aria-label', 'Выбрать все связанные документы');

        let history = [];
        let lastSourceDocs = null;
        let sortField = null;
        let sortDir = 'asc';
        let currentData = [];
        let returnFocusElement = null;

        function documents() {
            return options.getDocuments?.() || [];
        }

        function sortData(data) {
            if (!sortField) return data;

            return [...data].sort((a, b) => {
                if (sortField === 'number') {
                    const valA = a.number || '';
                    const valB = b.number || '';
                    return sortDir === 'asc'
                        ? valA.localeCompare(valB, undefined, { numeric: true })
                        : valB.localeCompare(valA, undefined, { numeric: true });
                }
                if (sortField === 'name') {
                    const valA = (a.name || '').toLowerCase();
                    const valB = (b.name || '').toLowerCase();
                    return sortDir === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
                }

                let valA = 0;
                let valB = 0;
                if (sortField === 'date') {
                    valA = options.parseDate?.(a.docDate) || 0;
                    valB = options.parseDate?.(b.docDate) || 0;
                } else if (sortField === 'changed') {
                    valA = options.parseDate?.(a.lastChange) || 0;
                    valB = options.parseDate?.(b.lastChange) || 0;
                }

                if (valA < valB) return sortDir === 'asc' ? -1 : 1;
                if (valA > valB) return sortDir === 'asc' ? 1 : -1;
                return 0;
            });
        }

        function renderIcon(sourceDocs, showBackArrow) {
            if (!iconContainer) return;

            iconContainer.replaceChildren();
            if (showBackArrow) {
                const button = document.createElement('button');
                button.type = 'button';
                button.className = 'btn-drawer-back';
                button.title = 'Назад';
                button.setAttribute('aria-label', 'Вернуться к предыдущим связям');
                button.appendChild(createIcon('arrow-left'));
                button.addEventListener('click', () => {
                    const prevState = history.pop();
                    if (!prevState) return;
                    currentData = prevState.related;
                    open(prevState.docs, true);
                });
                iconContainer.appendChild(button);
                return;
            }

            const icon = createIcon(Array.isArray(sourceDocs) ? 'link' : 'file-text', '', {
                color: 'var(--primary)',
                width: '32px',
                height: '32px'
            });
            iconContainer.appendChild(icon);
        }

        function createNameCell(doc) {
            const cell = document.createElement('td');
            cell.className = 'col-title';

            const container = document.createElement('div');
            container.className = 'name-container';

            const name = document.createElement('span');
            name.className = 'main-name';
            name.textContent = doc.name || '';
            name.title = doc.name || '';
            container.appendChild(name);

            if (doc.markedForDeletion) {
                const deletionIndicator = document.createElement('span');
                deletionIndicator.className = 'deletion-indicator';
                deletionIndicator.title = 'Пометка на удаление';
                deletionIndicator.setAttribute('aria-label', 'Документ помечен на удаление');
                deletionIndicator.appendChild(createIcon('file-x-2'));
                container.appendChild(deletionIndicator);
            }

            const packageWrapper = document.createElement('div');
            packageWrapper.className = 'package-icon-wrapper';
            packageWrapper.appendChild(createIcon('folder', 'row-package-icon', {
                width: '16px',
                height: '16px',
                color: '#94a3b8'
            }));

            const packagePopover = document.createElement('div');
            packagePopover.className = 'package-popover';
            packagePopover.textContent = options.findPackagePath?.(doc.packageId) || 'Пакет не найден';
            packageWrapper.appendChild(packagePopover);
            container.appendChild(packageWrapper);
            cell.appendChild(container);

            return cell;
        }

        function createMenuCell(doc) {
            const cell = document.createElement('td');
            cell.className = 'col-menu';

            const menuContainer = document.createElement('div');
            menuContainer.className = 'menu-container';

            const button = document.createElement('button');
            button.type = 'button';
            button.className = 'btn-secondary btn-icon-only btn-menu';
            button.setAttribute('aria-label', `Действия с документом № ${doc.number || ''}`.trim());
            button.setAttribute('aria-expanded', 'false');
            button.setAttribute('aria-haspopup', 'true');
            button.appendChild(createIcon('more-vertical'));
            menuContainer.appendChild(button);

            const dropdown = document.createElement('div');
            dropdown.className = 'menu-dropdown';
            dropdown.id = `relations-drawer-menu-${++menuId}`;
            button.setAttribute('aria-controls', dropdown.id);
            const relationsItem = createMenuItem({ icon: 'link', label: 'Связи документа', className: 'view-relations' });
            relationsItem.dataset.drawerAction = 'open-relations';

            dropdown.appendChild(createMenuItem({ icon: 'file-text', label: 'Показать в списке документов' }));
            dropdown.appendChild(createMenuItem({ icon: 'folder', label: 'Пакеты документа' }));
            dropdown.appendChild(relationsItem);
            dropdown.appendChild(createDivider());
            dropdown.appendChild(createMenuItem({ icon: 'eye', label: 'Просмотр' }));
            dropdown.appendChild(createMenuItem({ icon: 'edit-2', label: 'Редактировать' }));
            dropdown.appendChild(createMenuItem({ icon: 'refresh-cw', label: 'Изменить тип' }));
            dropdown.appendChild(createDivider());
            dropdown.appendChild(createMenuItem({ icon: 'copy', label: 'Создать копию' }));
            dropdown.appendChild(createMenuItem({ icon: 'file-plus', label: 'Создать версию' }));
            dropdown.appendChild(createMenuItem({ icon: 'download', label: 'Скачать документ' }));
            dropdown.appendChild(createDivider());
            const deletionItem = createMenuItem({
                icon: doc.markedForDeletion ? 'rotate-ccw' : 'trash-2',
                label: doc.markedForDeletion ? 'Снять отметку' : 'Пометка на удаление',
                className: `${doc.markedForDeletion ? '' : 'danger'} toggle-deletion`.trim()
            });
            deletionItem.dataset.drawerAction = 'toggle-deletion';
            dropdown.appendChild(deletionItem);

            menuContainer.appendChild(dropdown);
            cell.appendChild(menuContainer);

            function positionDropdown() {
                const rect = button.getBoundingClientRect();
                dropdown.style.position = 'fixed';
                dropdown.style.top = `${rect.bottom + 8}px`;
                dropdown.style.right = `${window.innerWidth - rect.right}px`;
                dropdown.style.zIndex = '3000';
            }

            button.addEventListener('click', event => {
                event.stopPropagation();
                const isOpen = menuContainer.classList.contains('open');
                document.querySelectorAll('.menu-container.open').forEach(item => {
                    item.classList.remove('open');
                    item.querySelector('.btn-menu')?.setAttribute('aria-expanded', 'false');
                });
                if (!isOpen) {
                    positionDropdown();
                    menuContainer.classList.add('open');
                    button.setAttribute('aria-expanded', 'true');
                }
            });

            relationsItem.addEventListener('click', event => {
                event.preventDefault();
                event.stopImmediatePropagation();
                menuContainer.classList.remove('open');
                button.setAttribute('aria-expanded', 'false');
                button.focus();
                open(doc);
            });

            deletionItem.addEventListener('click', event => {
                event.preventDefault();
                event.stopImmediatePropagation();
                menuContainer.classList.remove('open');
                button.setAttribute('aria-expanded', 'false');
                options.onToggleDeletion?.(doc);
                refreshOpenTable(doc.number);
            });

            dropdown.addEventListener('click', () => {
                menuContainer.classList.remove('open');
                button.setAttribute('aria-expanded', 'false');
            });

            return cell;
        }

        function createRow(doc) {
            const row = document.createElement('tr');
            row.dataset.documentNumber = doc.number || '';
            row.classList.toggle('marked-for-deletion', Boolean(doc.markedForDeletion));

            const checkboxCell = document.createElement('td');
            checkboxCell.className = 'col-checkbox';
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.className = 'esm-checkbox row-selector';
            checkbox.setAttribute('aria-label', `Выбрать документ № ${doc.number || ''}`.trim());
            checkboxCell.appendChild(checkbox);
            row.appendChild(checkboxCell);

            row.appendChild(createTextCell(doc.docDate));
            row.appendChild(createTextCell(doc.number));
            row.appendChild(createNameCell(doc));
            row.appendChild(createTextCell(doc.lastChange));
            row.appendChild(createTextCell(doc.docType));
            row.appendChild(createMenuCell(doc));

            checkbox.addEventListener('change', () => {
                row.classList.toggle('selected', checkbox.checked);
            });

            row.addEventListener('click', event => {
                if (event.target === checkbox) return;
                if (event.target.closest('.menu-container')) return;
                if (event.target.closest('.route-icon-container')) return;

                checkbox.checked = !checkbox.checked;
                row.classList.toggle('selected', checkbox.checked);
            });

            return row;
        }

        function createEmptyRow() {
            const row = document.createElement('tr');
            const cell = document.createElement('td');
            cell.colSpan = 7;
            cell.style.textAlign = 'center';
            cell.style.padding = '40px';
            cell.style.color = 'var(--text-muted)';
            cell.textContent = 'Связи документа не найдены';
            row.appendChild(cell);
            return row;
        }

        function renderTable(data) {
            if (!tableBody) return;

            const fragment = document.createDocumentFragment();
            if (data.length === 0) {
                fragment.appendChild(createEmptyRow());
            } else {
                data.forEach(doc => fragment.appendChild(createRow(doc)));
            }
            tableBody.replaceChildren(fragment);

            if (selectAll) selectAll.checked = false;
            if (window.lucide) window.lucide.createIcons();
        }

        function refreshOpenTable(focusDocumentNumber) {
            if (!drawer?.classList.contains('open')) return;

            const selectedNumbers = new Set(
                Array.from(tableBody?.querySelectorAll('.row-selector:checked') || [])
                    .map(checkbox => checkbox.closest('tr')?.dataset.documentNumber)
                    .filter(Boolean)
            );
            const latestDocuments = new Map(documents().map(doc => [doc.number, doc]));
            currentData = currentData.map(doc => latestDocuments.get(doc.number) || doc);
            history.forEach(state => {
                state.related = state.related.map(doc => latestDocuments.get(doc.number) || doc);
            });

            renderTable(sortData(currentData));
            tableBody?.querySelectorAll('tr[data-document-number]').forEach(row => {
                const checkbox = row.querySelector('.row-selector');
                const selected = selectedNumbers.has(row.dataset.documentNumber);
                if (checkbox) checkbox.checked = selected;
                row.classList.toggle('selected', selected);
            });

            if (selectAll) {
                const checkboxes = Array.from(tableBody?.querySelectorAll('.row-selector') || []);
                selectAll.checked = checkboxes.length > 0 && checkboxes.every(checkbox => checkbox.checked);
                selectAll.indeterminate = checkboxes.some(checkbox => checkbox.checked) && !selectAll.checked;
            }

            Array.from(tableBody?.querySelectorAll('tr[data-document-number]') || [])
                .find(row => row.dataset.documentNumber === String(focusDocumentNumber))
                ?.querySelector('.btn-menu')
                ?.focus();
        }

        function open(sourceDocs, isBackAction = false) {
            if (!drawer || !overlay || !title || !subtitle) return;

            const headers = document.querySelectorAll('.drawer-sortable');
            if (!isBackAction && !drawer.classList.contains('open')) {
                sortField = null;
                sortDir = 'asc';
                resetSortHeaders(headers);
            }

            if (!isBackAction && drawer.classList.contains('open')) {
                history.push({
                    docs: lastSourceDocs,
                    related: currentData
                });
            }

            const relatedNumbers = new Set();
            const showBackArrow = history.length > 0;
            title.textContent = 'Связи документа';

            if (Array.isArray(sourceDocs)) {
                const docNames = sourceDocs.map(doc => `«${doc.name}»`).join(', ');
                const label = options.getPluralForm?.(sourceDocs.length, 'Выбранного документа', 'Выбранных документов', 'Выбранных документов') || 'Выбранных документов';
                const text = `${label} (${sourceDocs.length}): ${docNames}`;
                subtitle.textContent = text;
                subtitle.title = text;
                sourceDocs.forEach(doc => {
                    if (doc.relatedDocs) doc.relatedDocs.forEach(number => relatedNumbers.add(number));
                });
            } else if (sourceDocs) {
                const text = `${sourceDocs.docType} № ${sourceDocs.number} «${sourceDocs.name}»`;
                subtitle.textContent = text;
                subtitle.title = text;
                if (sourceDocs.relatedDocs) sourceDocs.relatedDocs.forEach(number => relatedNumbers.add(number));
            }

            if (!drawer.classList.contains('open')) {
                returnFocusElement = document.activeElement instanceof HTMLElement ? document.activeElement : null;
            }
            renderIcon(sourceDocs, showBackArrow);
            overlay.classList.add('open');
            overlay.setAttribute('aria-hidden', 'false');
            drawer.classList.add('open');
            drawer.setAttribute('aria-hidden', 'false');
            drawer.removeAttribute('inert');

            lastSourceDocs = sourceDocs;
            if (!isBackAction) {
                currentData = documents().filter(doc => relatedNumbers.has(doc.number));
            }

            renderTable(sortData(currentData));
            if (window.lucide) window.lucide.createIcons();
            if (!isBackAction) drawer.querySelector('.btn-close-drawer')?.focus();
        }

        function close() {
            overlay?.classList.remove('open');
            overlay?.setAttribute('aria-hidden', 'true');
            drawer?.classList.remove('open');
            drawer?.setAttribute('aria-hidden', 'true');
            drawer?.setAttribute('inert', '');
            history = [];
            sortField = null;
            sortDir = 'asc';
            if (returnFocusElement?.isConnected) {
                returnFocusElement.focus();
            } else {
                const sourceDocument = Array.isArray(lastSourceDocs) ? lastSourceDocs[0] : lastSourceDocs;
                const sourceRow = Array.from(document.querySelectorAll('#table-body tr[data-document-number]'))
                    .find(row => row.dataset.documentNumber === String(sourceDocument?.number || ''));
                (sourceRow?.querySelector('.btn-menu') || document.getElementById('open-settings-btn'))?.focus();
            }
            returnFocusElement = null;
        }

        function bindSorting() {
            const sortByHeader = header => {
                const nextSortField = header.dataset.sort;
                if (sortField === nextSortField) {
                    sortDir = sortDir === 'asc' ? 'desc' : 'asc';
                } else {
                    sortField = nextSortField;
                    sortDir = 'asc';
                }

                const headers = document.querySelectorAll('.drawer-sortable');
                resetSortHeaders(headers);
                header.setAttribute('data-sort-dir', sortDir);
                header.setAttribute('aria-sort', sortDir === 'asc' ? 'ascending' : 'descending');
                const activeIcon = header.querySelector('.sort-icon');
                if (activeIcon) {
                    activeIcon.setAttribute(
                        'data-lucide',
                        nextSortField === 'name'
                            ? (sortDir === 'asc' ? 'arrow-down-a-z' : 'arrow-up-z-a')
                            : (sortDir === 'asc' ? 'arrow-down' : 'arrow-up')
                    );
                }

                renderTable(sortData(currentData));
                if (window.lucide) window.lucide.createIcons();
            };

            tableHead?.querySelectorAll('.drawer-sortable').forEach(header => {
                header.tabIndex = 0;
                header.setAttribute('aria-sort', 'none');
            });
            tableHead?.addEventListener('click', event => {
                const header = event.target.closest('.drawer-sortable');
                if (header) sortByHeader(header);
            });
            tableHead?.addEventListener('keydown', event => {
                if (event.key !== 'Enter' && event.key !== ' ') return;
                const header = event.target.closest('.drawer-sortable');
                if (!header) return;
                event.preventDefault();
                sortByHeader(header);
            });
        }

        function bindSelectAll() {
            selectAll?.addEventListener('change', () => {
                const checked = selectAll.checked;
                document.querySelectorAll(`#${options.tableBodyId} .row-selector`).forEach(checkbox => {
                    checkbox.checked = checked;
                    checkbox.closest('tr')?.classList.toggle('selected', checked);
                });
            });
        }

        bindSorting();
        bindSelectAll();
        document.addEventListener('keydown', event => {
            if (event.key === 'Escape' && drawer?.classList.contains('open')) close();
        });

        return Object.freeze({
            open,
            close
        });
    }

    window.addEventListener('click', () => {
        document.querySelectorAll('button[aria-controls^="relations-drawer-menu-"]').forEach(button => {
            button.setAttribute('aria-expanded', String(button.closest('.menu-container')?.classList.contains('open')));
        });
    });
