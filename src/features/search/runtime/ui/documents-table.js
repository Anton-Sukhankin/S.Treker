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

    function createDeletionIndicator(markForDeletionSvg) {
        const indicator = document.createElement('div');
        indicator.className = 'deletion-indicator';
        indicator.title = 'Пометка на удаление';
        indicator.innerHTML = markForDeletionSvg;
        return indicator;
    }

    function createRoutePopover(doc, findPackagePath, getPluralForm) {
        const container = document.createElement('div');
        container.className = 'multi-route-container';
        container.appendChild(createIcon('folder-tree', 'multi-route-icon'));

        const popover = document.createElement('div');
        popover.className = 'route-popover';

        const title = document.createElement('div');
        title.className = 'route-popover-title';
        title.textContent = `${getPluralForm(doc.packageIds.length, 'МАРШРУТ', 'МАРШРУТА', 'МАРШРУТОВ')} ${doc.packageIds.length}`;
        popover.appendChild(title);

        doc.packageIds.forEach(packageId => {
            const item = document.createElement('div');
            item.className = 'route-item';
            item.textContent = findPackagePath(packageId) || 'Пакет не найден';
            popover.appendChild(item);
        });

        container.appendChild(popover);
        return container;
    }

    function createPackageIcon(packagePath, isMultiRoute) {
        const wrapper = document.createElement('div');
        wrapper.className = 'package-icon-wrapper';
        if (isMultiRoute) wrapper.style.display = 'none';

        wrapper.appendChild(createIcon('folder', 'row-package-icon', {
            width: '16px',
            height: '16px',
            color: '#94a3b8'
        }));

        const popover = document.createElement('div');
        popover.className = 'package-popover';
        popover.textContent = packagePath;
        wrapper.appendChild(popover);

        return wrapper;
    }

    function createNameCell(doc, context) {
        const cell = document.createElement('td');
        cell.className = `col-title col-name${context.isPinned ? ' pinned-col' : ''}`;

        const nameContainer = document.createElement('div');
        nameContainer.className = 'name-container';

        const textWrapper = document.createElement('div');
        textWrapper.className = 'name-text-wrapper';

        const name = document.createElement('span');
        name.className = 'main-name';
        name.textContent = doc.name || '';
        if (doc.hasAccess !== false) name.title = doc.name || '';
        textWrapper.appendChild(name);

        const iconsGroup = document.createElement('div');
        iconsGroup.className = 'name-icons-group';

        if (doc.markedForDeletion) {
            iconsGroup.appendChild(createDeletionIndicator(context.markForDeletionSvg));
        }

        if (context.isMultiRoute) {
            iconsGroup.appendChild(createRoutePopover(doc, context.findPackagePath, context.getPluralForm));
        }

        iconsGroup.appendChild(createPackageIcon(context.packagePath, context.isMultiRoute));

        nameContainer.appendChild(textWrapper);
        nameContainer.appendChild(iconsGroup);
        cell.appendChild(nameContainer);

        return cell;
    }

    function createTextCell(className, value, isPinned) {
        const cell = document.createElement('td');
        cell.className = `${className}${isPinned ? ' pinned-col' : ''}`;
        cell.textContent = value || '';
        return cell;
    }

    function createMenuCell(doc) {
        const cell = document.createElement('td');
        cell.className = 'col-menu';

        const container = document.createElement('div');
        container.className = 'menu-container';

        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'btn-secondary btn-icon-only btn-menu';
        button.setAttribute('aria-label', `Действия с документом № ${doc.number || ''}`.trim());
        button.setAttribute('aria-expanded', 'false');
        button.setAttribute('aria-haspopup', 'true');
        if (doc.hasAccess === false) button.disabled = true;
        button.appendChild(createIcon('more-vertical'));
        container.appendChild(button);

        const dropdown = document.createElement('div');
        dropdown.className = 'menu-dropdown';
        dropdown.id = `documents-table-menu-${++menuId}`;
        button.setAttribute('aria-controls', dropdown.id);

        dropdown.appendChild(createMenuItem({ icon: 'file-text', label: 'Показать в списке документов' }));
        dropdown.appendChild(createMenuItem({ icon: 'folder', label: 'Пакеты документа' }));
        dropdown.appendChild(createMenuItem({ icon: 'link', label: 'Связи документа', className: 'view-relations' }));
        dropdown.appendChild(createDivider());
        dropdown.appendChild(createMenuItem({ icon: 'eye', label: 'Просмотр' }));
        dropdown.appendChild(createMenuItem({ icon: 'edit-2', label: 'Редактировать' }));
        dropdown.appendChild(createMenuItem({ icon: 'refresh-cw', label: 'Изменить тип' }));
        dropdown.appendChild(createDivider());
        dropdown.appendChild(createMenuItem({ icon: 'copy', label: 'Создать копию' }));
        dropdown.appendChild(createMenuItem({ icon: 'file-plus', label: 'Создать версию' }));
        dropdown.appendChild(createMenuItem({ icon: 'download', label: 'Скачать документ' }));
        dropdown.appendChild(createDivider());
        dropdown.appendChild(createMenuItem({
            icon: doc.markedForDeletion ? 'rotate-ccw' : 'trash-2',
            label: doc.markedForDeletion ? 'Снять отметку' : 'Пометка на удаление',
            className: `${doc.markedForDeletion ? '' : 'danger'} toggle-deletion`.trim()
        }));

        container.appendChild(dropdown);
        cell.appendChild(container);

        return cell;
    }

    function syncRowSelection(row, checkbox, doc, selectedDocumentIds) {
        const selected = selectedDocumentIds.has(doc.number);
        checkbox.checked = selected;
        row.classList.toggle('selected', selected);
    }

    function setRowSelected(row, checkbox, doc, selectedDocumentIds, selected, onSelectionChange) {
        checkbox.checked = selected;
        row.classList.toggle('selected', selected);

        if (selected) selectedDocumentIds.add(doc.number);
        else selectedDocumentIds.delete(doc.number);

        onSelectionChange?.(doc, selected);
    }

    function createDocumentRow(doc, options) {
        const row = document.createElement('tr');
        row.dataset.documentNumber = String(doc.number);
        if (doc.isSecondaryConnection) row.classList.add('secondary-result');
        if (doc.markedForDeletion) row.classList.add('marked-for-deletion');
        if (doc.hasAccess === false) {
            row.classList.add('inaccessible-doc');
            row.title = 'Документ недоступен';
        }

        const checkboxCell = document.createElement('td');
        checkboxCell.className = 'col-checkbox';
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'row-selector esm-checkbox';
        checkbox.setAttribute('aria-label', `Выбрать документ № ${doc.number || ''}`.trim());
        if (doc.hasAccess === false) checkbox.disabled = true;
        checkboxCell.appendChild(checkbox);
        row.appendChild(checkboxCell);

        const isMultiRoute = Array.isArray(doc.packageIds) && doc.packageIds.length > 1;
        const primaryPackageId = isMultiRoute ? doc.packageIds[0] : doc.packageId;
        const packagePath = options.findPackagePath(primaryPackageId) || 'Пакет не найден';

        options.activeColumns.forEach(colId => {
            const isPinned = options.pinnedColumns.has(colId);

            if (colId === 'date') {
                row.appendChild(createTextCell('col-date', doc.docDate, isPinned));
            } else if (colId === 'number') {
                row.appendChild(createTextCell('col-number', doc.number, isPinned));
            } else if (colId === 'name') {
                row.appendChild(createNameCell(doc, {
                    isPinned,
                    isMultiRoute,
                    packagePath,
                    markForDeletionSvg: options.markForDeletionSvg,
                    findPackagePath: options.findPackagePath,
                    getPluralForm: options.getPluralForm
                }));
            } else if (colId === 'changed') {
                row.appendChild(createTextCell('col-changed', doc.lastChange, isPinned));
            } else if (colId === 'type') {
                row.appendChild(createTextCell('col-type', doc.docType, isPinned));
            } else {
                row.appendChild(createTextCell('col-additional', doc[colId], isPinned));
            }
        });

        row.appendChild(createMenuCell(doc));
        syncRowSelection(row, checkbox, doc, options.selectedDocumentIds);

        const relationsBtn = row.querySelector('.menu-item.view-relations');
        relationsBtn.addEventListener('click', () => {
            row.querySelector('.btn-menu')?.focus();
            options.onOpenRelations?.(doc);
        });

        const toggleDeletionBtn = row.querySelector('.menu-item.toggle-deletion');
        toggleDeletionBtn.addEventListener('click', () => {
            options.onToggleDeletion?.(doc);
        });

        const menuContainer = row.querySelector('.menu-container');
        const menuButton = row.querySelector('.btn-menu');
        const menuDropdown = row.querySelector('.menu-dropdown');

        menuButton.addEventListener('click', event => {
            event.stopPropagation();
            const isOpen = menuContainer.classList.contains('open');
            document.querySelectorAll('.menu-container.open').forEach(item => {
                item.classList.remove('open');
                item.querySelector('.btn-menu')?.setAttribute('aria-expanded', 'false');
            });
            if (!isOpen) {
                menuContainer.classList.add('open');
                menuButton.setAttribute('aria-expanded', 'true');
            }
        });

        menuDropdown.addEventListener('click', () => {
            menuContainer.classList.remove('open');
            menuButton.setAttribute('aria-expanded', 'false');
        });

        checkbox.addEventListener('change', () => {
            setRowSelected(row, checkbox, doc, options.selectedDocumentIds, checkbox.checked, options.onSelectionChange);
        });

        row.addEventListener('click', event => {
            if (doc.hasAccess === false) return;
            if (event.target === checkbox) return;
            if (event.target.closest('.menu-container')) return;
            if (event.target.closest('.package-icon-wrapper')) return;

            setRowSelected(row, checkbox, doc, options.selectedDocumentIds, !checkbox.checked, options.onSelectionChange);
        });

        return row;
    }

    function createEmptyRow(colspan) {
        const row = document.createElement('tr');
        const cell = document.createElement('td');
        cell.colSpan = colspan;
        cell.style.textAlign = 'center';
        cell.style.padding = '40px';
        cell.textContent = 'Ничего не найдено';
        row.appendChild(cell);
        return row;
    }

export function renderDocumentRows(tableBody, pageData, options) {
        const fragment = document.createDocumentFragment();

        if (pageData.length === 0) {
            fragment.appendChild(createEmptyRow(Math.max(options.activeColumns.length + 2, 9)));
        } else {
            pageData.forEach(doc => {
                fragment.appendChild(createDocumentRow(doc, options));
            });
        }

        tableBody.replaceChildren(fragment);
    }

export function syncSelectAll(input, pageData, selectedDocumentIds, onChange) {
        if (!input) return;

        input.setAttribute('aria-label', 'Выбрать все документы на странице');
        const accessibleDocs = pageData.filter(doc => doc.hasAccess !== false);
        input.checked = accessibleDocs.length > 0 && accessibleDocs.every(doc => selectedDocumentIds.has(doc.number));
        input.indeterminate = accessibleDocs.some(doc => selectedDocumentIds.has(doc.number)) && !input.checked;

        input.onchange = () => {
            accessibleDocs.forEach(doc => {
                if (input.checked) selectedDocumentIds.add(doc.number);
                else selectedDocumentIds.delete(doc.number);
            });
            onChange?.();
        };
    }

    window.addEventListener('click', () => {
        document.querySelectorAll('button[aria-controls^="documents-table-menu-"]').forEach(button => {
            button.setAttribute('aria-expanded', String(button.closest('.menu-container')?.classList.contains('open')));
        });
    });
