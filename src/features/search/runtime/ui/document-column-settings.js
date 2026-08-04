function createIcon(name, className) {
        const icon = document.createElement('i');
        icon.setAttribute('data-lucide', name);
        if (className) icon.className = className;
        return icon;
    }

    function clearNode(node) {
        while (node.firstChild) {
            node.removeChild(node.firstChild);
        }
    }

    function getItemLabel(item) {
        return item.querySelector('.settings-item-label')?.textContent?.trim() || '';
    }

    function createItemContent(label, withCheckbox) {
        const content = document.createElement('div');
        content.className = 'settings-item-content';

        if (withCheckbox) {
            const checkbox = document.createElement('div');
            checkbox.className = 'settings-checkbox';
            checkbox.setAttribute('aria-hidden', 'true');
            checkbox.appendChild(createIcon('check'));
            content.appendChild(checkbox);
        }

        const labelElement = document.createElement('span');
        labelElement.className = 'settings-item-label';
        labelElement.textContent = label;
        content.appendChild(labelElement);

        return content;
    }

    function renderMainItem(item, label) {
        clearNode(item);
        item.tabIndex = 0;
        item.setAttribute('role', 'checkbox');
        item.setAttribute('aria-checked', String(item.classList.contains('active')));
        item.appendChild(createItemContent(label, true));

        const returnButton = document.createElement('button');
        returnButton.type = 'button';
        returnButton.className = 'settings-item-return';
        returnButton.title = 'Вернуть в библиотеку';
        returnButton.setAttribute('aria-label', `Вернуть колонку «${label}» в библиотеку`);
        returnButton.appendChild(createIcon('arrow-left'));
        item.appendChild(returnButton);

        const pinButton = document.createElement('button');
        pinButton.type = 'button';
        pinButton.className = 'settings-item-pin';
        pinButton.title = 'Закрепить колонку';
        pinButton.setAttribute('aria-label', `Закрепить колонку «${label}»`);
        pinButton.appendChild(createIcon('pin'));
        item.appendChild(pinButton);

        const dragHandle = document.createElement('div');
        dragHandle.className = 'settings-item-drag';
        dragHandle.setAttribute('draggable', 'true');
        dragHandle.appendChild(createIcon('grip-vertical'));
        item.appendChild(dragHandle);
    }

    function renderLibraryItem(item, label) {
        clearNode(item);
        item.appendChild(createItemContent(label, false));

        const addButton = document.createElement('button');
        addButton.className = 'btn-add-attr btn-secondary btn-icon-only';
        addButton.title = 'Добавить';
        addButton.appendChild(createIcon('plus'));
        item.appendChild(addButton);
    }

    function createTemplateMenuItem(templateName, isActive, canDelete) {
        const item = document.createElement('button');
        item.type = 'button';
        item.className = `view-dropdown-item${isActive ? ' active' : ''}`;
        item.dataset.name = templateName;

        const textSpan = document.createElement('span');
        textSpan.textContent = templateName;
        item.appendChild(textSpan);

        if (canDelete) {
            const delIcon = createIcon('trash-2', 'view-dropdown-delete');
            item.appendChild(delIcon);
        }

        return item;
    }

export function createDocumentColumnSettingsController(options) {
        const {
            overlayId,
            drawerId,
            openButtonId,
            closeButtonId,
            libraryToggleButtonId,
            panesSelector,
            mainListSelector,
            libraryListSelector,
            librarySearchSelector,
            defaultButtonId,
            applyButtonId,
            tableSelector,
            viewDropdownId,
            viewSaveButtonId,
            saveViewOverlayId,
            viewTemplateInputId,
            confirmSaveViewButtonId,
            closeSaveViewButtonId,
            cancelSaveViewButtonId,
            baseState,
            initialOrder,
            pinnedColumns,
            getLastFilteredData,
            onApplyColumns,
            onRenderTable,
            onCreateIcons
        } = options;

        const baseTemplateName = 'Базовое отображение';
        const baseActive = [...baseState.active];
        const basePinned = [...baseState.pinned];
        const baseOrder = [...baseState.order];
        const baseConfig = {
            active: [...baseActive],
            pinned: [...basePinned],
            order: [...baseOrder]
        };
        const coreColumnIds = new Set(baseActive);
        let savedTemplates = [
            { name: baseTemplateName, config: cloneColumnState(baseConfig) }
        ];
        let appliedState = cloneColumnState({
            active: baseActive,
            pinned: pinnedColumns instanceof Set ? Array.from(pinnedColumns) : basePinned,
            order: Array.isArray(initialOrder) ? initialOrder : baseOrder
        });
        let draftState = null;
        let appliedTemplateName = baseTemplateName;
        let draftTemplateName = null;
        let dragSrcEl = null;
        let returnFocusElement = null;
        let saveReturnFocusElement = null;

        function cloneColumnState(config) {
            return {
                active: [...config.active],
                pinned: [...config.pinned],
                order: [...config.order]
            };
        }

        function arraysEqual(left, right) {
            return left.length === right.length
                && left.every((value, index) => value === right[index]);
        }

        function getDrawer() {
            return document.getElementById(drawerId);
        }

        function getOverlay() {
            return document.getElementById(overlayId);
        }

        function getMainList() {
            return document.querySelector(mainListSelector);
        }

        function getLibraryList() {
            return document.querySelector(libraryListSelector);
        }

        function getViewDropdown() {
            return document.getElementById(viewDropdownId);
        }

        function getViewDropdownMenu() {
            return getViewDropdown()?.closest('.view-dropdown-container')?.querySelector('.view-dropdown-menu') || null;
        }

        function getAllSettingItems() {
            return Array.from(document.querySelectorAll('.settings-item')).filter(item => item.dataset.col);
        }

        function createIcons() {
            if (typeof onCreateIcons === 'function') {
                onCreateIcons();
            }
        }

        function openDrawer() {
            returnFocusElement = document.activeElement instanceof HTMLElement ? document.activeElement : null;
            draftState = cloneColumnState(appliedState);
            draftTemplateName = appliedTemplateName;
            syncSettingsUI(draftState);
            updateTemplateDropdown(draftTemplateName);

            const overlay = getOverlay();
            const drawer = getDrawer();
            if (overlay) overlay.classList.add('open');
            if (overlay) overlay.setAttribute('aria-hidden', 'false');
            if (drawer) {
                drawer.classList.add('open');
                drawer.setAttribute('aria-hidden', 'false');
                drawer.removeAttribute('inert');
            }
            createIcons();
            drawer?.querySelector('.btn-close-drawer')?.focus();
        }

        function closeDrawer() {
            const overlay = getOverlay();
            const drawer = getDrawer();
            if (overlay) overlay.classList.remove('open');
            if (overlay) overlay.setAttribute('aria-hidden', 'true');
            if (drawer) {
                drawer.classList.remove('open', 'expanded');
                drawer.setAttribute('aria-hidden', 'true');
                drawer.setAttribute('inert', '');
            }

            const libraryToggleBtn = document.getElementById(libraryToggleButtonId);
            if (libraryToggleBtn) libraryToggleBtn.classList.remove('active');

            draftState = null;
            draftTemplateName = null;
            dragSrcEl = null;
            if (returnFocusElement?.isConnected) returnFocusElement.focus();
            returnFocusElement = null;
        }

        function openSaveViewModal() {
            const overlay = document.getElementById(saveViewOverlayId);
            saveReturnFocusElement = document.activeElement instanceof HTMLElement ? document.activeElement : null;
            overlay?.classList.add('open');
            overlay?.setAttribute('aria-hidden', 'false');
            overlay?.removeAttribute('inert');
            document.getElementById(viewTemplateInputId)?.focus();
        }

        function closeSaveViewModal() {
            const overlay = document.getElementById(saveViewOverlayId);
            overlay?.classList.remove('open');
            overlay?.setAttribute('aria-hidden', 'true');
            overlay?.setAttribute('inert', '');
            if (saveReturnFocusElement?.isConnected) saveReturnFocusElement.focus();
            saveReturnFocusElement = null;
        }

        function attachDragListeners(item) {
            item.setAttribute('draggable', 'true');
            item.addEventListener('dragstart', handleDragStart);
            item.addEventListener('dragover', handleDragOver);
            item.addEventListener('drop', handleDrop);
            item.addEventListener('dragend', handleDragEnd);
        }

        function detachDragListeners(item) {
            item.removeAttribute('draggable');
            item.removeEventListener('dragstart', handleDragStart);
            item.removeEventListener('dragover', handleDragOver);
            item.removeEventListener('drop', handleDrop);
            item.removeEventListener('dragend', handleDragEnd);
        }

        function moveToMain(item, colId, label = getItemLabel(item), syncDraft = true) {
            item.classList.remove('library-item');
            item.classList.add('active');
            renderMainItem(item, label);

            const mainList = getMainList();
            if (mainList) {
                mainList.appendChild(item);
                attachDragListeners(item);
            }

            reorderDrawerItems();
            if (syncDraft) {
                syncDraftFromUI();
                checkSettingsChanged();
                createIcons();
            }
        }

        function moveToLibrary(item, colId, label = getItemLabel(item), syncDraft = true) {
            item.classList.add('library-item');
            item.classList.remove('active');
            if (draftState) {
                draftState.pinned = draftState.pinned.filter(id => id !== colId);
            }
            renderLibraryItem(item, label);

            const libraryList = getLibraryList();
            if (libraryList) libraryList.appendChild(item);
            detachDragListeners(item);

            if (syncDraft) {
                syncDraftFromUI();
                checkSettingsChanged();
                createIcons();
            }
        }

        function reorderDrawerItems() {
            const mainList = getMainList();
            if (!mainList) return;

            const items = Array.from(mainList.querySelectorAll('.settings-item'));
            const draftPinned = new Set(draftState?.pinned || []);
            const pinned = items.filter(item => draftPinned.has(item.dataset.col));
            const unpinned = items.filter(item => !draftPinned.has(item.dataset.col));

            [...pinned, ...unpinned].forEach(item => mainList.appendChild(item));
        }

        function syncDraftFromUI() {
            if (!draftState) return;

            const mainItems = getMainList()
                ? Array.from(getMainList().querySelectorAll('.settings-item'))
                : [];
            const libraryItems = getLibraryList()
                ? Array.from(getLibraryList().querySelectorAll('.settings-item'))
                : [];
            const active = mainItems
                .filter(item => item.classList.contains('active'))
                .map(item => item.dataset.col);
            const activeSet = new Set(active);
            const pinnedSet = new Set(draftState.pinned);

            draftState = {
                active,
                pinned: mainItems
                    .map(item => item.dataset.col)
                    .filter(colId => activeSet.has(colId) && pinnedSet.has(colId)),
                order: [...mainItems, ...libraryItems].map(item => item.dataset.col)
            };
        }

        function getDrawerState() {
            syncDraftFromUI();
            return cloneColumnState(draftState || appliedState);
        }

        function isBaseState(state) {
            return arraysEqual(state.active, baseActive)
                && arraysEqual(state.pinned, basePinned)
                && arraysEqual(state.order, baseOrder);
        }

        function checkSettingsChanged() {
            const saveButton = document.getElementById(viewSaveButtonId);
            if (saveButton) saveButton.disabled = isBaseState(draftState || appliedState);
        }

        function updateTemplateDropdown(templateName) {
            const dropdown = getViewDropdown();
            const menu = getViewDropdownMenu();
            if (menu) {
                menu.querySelectorAll('.view-dropdown-item').forEach(item => {
                    item.classList.toggle('active', item.dataset.name === templateName);
                });
            }

            if (dropdown) {
                const label = dropdown.querySelector('span');
                if (label) label.textContent = templateName;
                dropdown.dataset.activeTemplate = templateName;
            }
        }

        function resetToDefault() {
            draftState = cloneColumnState(baseConfig);
            draftTemplateName = baseTemplateName;
            syncSettingsUI(draftState);
            updateTemplateDropdown(baseTemplateName);
            checkSettingsChanged();
        }

        function syncSettingsUI(config) {
            if (!config || !Array.isArray(config.order) || !Array.isArray(config.active) || !Array.isArray(config.pinned)) {
                return;
            }

            const allItems = getAllSettingItems();
            const allItemsMap = {};
            allItems.forEach(item => {
                allItemsMap[item.dataset.col] = item;
                item.classList.remove('active');
                item.querySelector('.settings-item-pin')?.classList.remove('pinned');
            });

            const mainList = getMainList();
            const libraryList = getLibraryList();
            if (!mainList || !libraryList) return;

            const orderedColumnIds = [...config.order];
            Object.keys(allItemsMap).forEach(colId => {
                if (!orderedColumnIds.includes(colId)) orderedColumnIds.push(colId);
            });

            orderedColumnIds.forEach(colId => {
                const item = allItemsMap[colId];
                if (!item) return;

                const label = getItemLabel(item);
                const isActive = config.active.includes(colId);
                const isCore = coreColumnIds.has(colId);

                if (isCore) {
                    if (item.classList.contains('library-item')) {
                        moveToMain(item, colId, label, false);
                    } else {
                        renderMainItem(item, label);
                        mainList.appendChild(item);
                    }
                    item.classList.toggle('active', isActive);
                } else if (isActive) {
                    moveToMain(item, colId, label, false);
                    item.classList.add('active');
                } else {
                    moveToLibrary(item, colId, label, false);
                }
            });

            config.pinned.forEach(colId => {
                const item = allItemsMap[colId];
                if (!item || !config.active.includes(colId)) return;

                item.querySelector('.settings-item-pin')?.classList.add('pinned');
            });
            Object.values(allItemsMap).forEach(item => {
                if (item.classList.contains('library-item')) return;
                item.setAttribute('aria-checked', String(item.classList.contains('active')));
                const pin = item.querySelector('.settings-item-pin');
                pin?.setAttribute('aria-pressed', String(pin.classList.contains('pinned')));
            });

            syncLibraryButtons();
            reorderDrawerItems();
            syncDraftFromUI();
            checkSettingsChanged();
            createIcons();
        }

        function applyView(templateName) {
            const cleanName = (templateName || '').trim();
            if (!cleanName) return;

            if (cleanName.toLowerCase() === baseTemplateName.toLowerCase()) {
                resetToDefault();
                const saveButton = document.getElementById(viewSaveButtonId);
                if (saveButton) saveButton.disabled = true;
                return;
            }

            const template = savedTemplates.find(item => item.name.trim() === cleanName);
            if (!template) return;

            draftState = cloneColumnState(template.config);
            draftTemplateName = template.name;
            syncSettingsUI(draftState);
            const saveButton = document.getElementById(viewSaveButtonId);
            if (saveButton) saveButton.disabled = true;
        }

        function applyToTable() {
            const nextState = getDrawerState();
            if (typeof onApplyColumns === 'function') {
                onApplyColumns(cloneColumnState(nextState));
            }

            appliedState = cloneColumnState(nextState);
            appliedTemplateName = draftTemplateName || appliedTemplateName;

            const headerRow = document.querySelector(`${tableSelector} thead tr`);
            if (headerRow) {
                const ths = Array.from(headerRow.querySelectorAll('th.sortable'));
                const thMap = {};
                ths.forEach(th => {
                    thMap[th.dataset.sort] = th;
                    th.style.display = 'none';
                    th.classList.remove('pinned-col');
                    th.style.left = '';
                });

                const colMenu = headerRow.querySelector('.col-menu');
                const appliedPinned = new Set(nextState.pinned);
                nextState.active.forEach(colId => {
                    const th = thMap[colId];
                    if (!th) return;

                    th.style.display = '';
                    if (appliedPinned.has(colId)) th.classList.add('pinned-col');
                    headerRow.insertBefore(th, colMenu);
                });
            }

            closeDrawer();

            if (typeof onRenderTable === 'function') {
                onRenderTable(getLastFilteredData());
            }
        }

        function handleDragStart(e) {
            dragSrcEl = this;
            e.dataTransfer.effectAllowed = 'move';
            this.classList.add('dragging');
        }

        function handleDragOver(e) {
            if (e.preventDefault) e.preventDefault();
            return false;
        }

        function handleDrop(e) {
            e.stopPropagation();
            if (dragSrcEl && dragSrcEl !== this) {
                const list = this.parentElement;
                const allItems = Array.from(list.children);
                const fromIdx = allItems.indexOf(dragSrcEl);
                const toIdx = allItems.indexOf(this);

                if (fromIdx < toIdx) {
                    list.insertBefore(dragSrcEl, this.nextSibling);
                } else {
                    list.insertBefore(dragSrcEl, this);
                }

                reorderDrawerItems();
                syncDraftFromUI();
                checkSettingsChanged();
            }
            return false;
        }

        function handleDragEnd() {
            this.classList.remove('dragging');
        }

        function syncLibraryButtons() {
            document.querySelectorAll('.library-item').forEach(item => {
                const addBtn = item.querySelector('.btn-add-attr');
                if (addBtn) {
                    const icon = addBtn.querySelector('i, svg');
                    if (icon) icon.setAttribute('data-lucide', 'plus');
                    addBtn.classList.remove('btn-primary');
                    addBtn.classList.add('btn-secondary');
                }
                item.classList.remove('active');
            });
            createIcons();
        }

        function saveCurrentView() {
            const input = document.getElementById(viewTemplateInputId);
            const overlay = document.getElementById(saveViewOverlayId);
            const confirmButton = document.getElementById(confirmSaveViewButtonId);
            const templateName = input?.value.trim();
            if (!templateName) return;

            const templateExists = savedTemplates.some(item => item.name.trim().toLowerCase() === templateName.toLowerCase());
            if (templateExists) return;

            savedTemplates.push({
                name: templateName,
                config: getDrawerState()
            });
            draftTemplateName = templateName;

            const menu = getViewDropdownMenu();
            if (menu) {
                menu.querySelectorAll('.view-dropdown-item').forEach(item => item.classList.remove('active'));
                menu.appendChild(createTemplateMenuItem(templateName, true, true));
            }

            updateTemplateDropdown(templateName);
            closeSaveViewModal();
            if (input) {
                input.value = '';
                input.style.borderColor = '';
            }
            if (confirmButton) confirmButton.disabled = true;

            const saveButton = document.getElementById(viewSaveButtonId);
            if (saveButton) saveButton.disabled = true;
            createIcons();
        }

        function validateTemplateName() {
            const input = document.getElementById(viewTemplateInputId);
            const confirmButton = document.getElementById(confirmSaveViewButtonId);
            if (!input || !confirmButton) return;

            const value = input.value.trim().toLowerCase();
            const exists = savedTemplates.some(item => item.name.trim().toLowerCase() === value);
            confirmButton.disabled = !value || exists || value === baseTemplateName.toLowerCase();
            input.style.borderColor = exists && value !== '' ? 'red' : '';
        }

        function deleteTemplate(templateName) {
            savedTemplates = savedTemplates.filter(item => item.name !== templateName);
            if (draftTemplateName === templateName) {
                resetToDefault();
            }
        }

        function attachEventListeners() {
            document.getElementById(openButtonId)?.addEventListener('click', openDrawer);
            document.getElementById(closeButtonId)?.addEventListener('click', closeDrawer);

            document.getElementById(libraryToggleButtonId)?.addEventListener('click', () => {
                const drawer = getDrawer();
                const libraryToggleBtn = document.getElementById(libraryToggleButtonId);
                if (drawer) drawer.classList.toggle('expanded');
                if (libraryToggleBtn) libraryToggleBtn.classList.toggle('active');
                createIcons();
            });

            document.querySelector(panesSelector)?.addEventListener('click', event => {
                const item = event.target.closest('.settings-item');
                if (!item) return;

                const colId = item.dataset.col;
                const label = getItemLabel(item);

                if (event.target.closest('.settings-item-return')) {
                    event.stopPropagation();
                    moveToLibrary(item, colId, label);
                    return;
                }

                if (event.target.closest('.settings-item-pin')) {
                    event.stopPropagation();
                    if (!draftState || !item.classList.contains('active')) return;

                    const pin = event.target.closest('.settings-item-pin');
                    pin.classList.toggle('pinned');
                    pin.setAttribute('aria-pressed', String(pin.classList.contains('pinned')));
                    if (pin.classList.contains('pinned')) {
                        if (!draftState.pinned.includes(colId)) draftState.pinned.push(colId);
                    } else {
                        draftState.pinned = draftState.pinned.filter(id => id !== colId);
                    }
                    reorderDrawerItems();
                    syncDraftFromUI();
                    checkSettingsChanged();
                    return;
                }

                if (event.target.closest('.btn-add-attr')) {
                    event.stopPropagation();
                    moveToMain(item, colId, label);
                    return;
                }

                if (event.target.closest('.settings-item-drag')) return;

                if (!item.classList.contains('library-item')) {
                    item.classList.toggle('active');
                    item.setAttribute('aria-checked', String(item.classList.contains('active')));
                    if (!item.classList.contains('active') && draftState) {
                        draftState.pinned = draftState.pinned.filter(id => id !== colId);
                        item.querySelector('.settings-item-pin')?.classList.remove('pinned');
                        reorderDrawerItems();
                    }
                    syncDraftFromUI();
                    checkSettingsChanged();
                }
            });
            document.querySelector(panesSelector)?.addEventListener('keydown', event => {
                if (event.key !== 'Enter' && event.key !== ' ') return;
                const item = event.target.closest('.settings-item');
                if (!item || event.target !== item) return;
                event.preventDefault();
                item.click();
            });

            document.getElementById(defaultButtonId)?.addEventListener('click', resetToDefault);
            document.getElementById(applyButtonId)?.addEventListener('click', applyToTable);

            document.querySelectorAll('.settings-item').forEach(item => {
                if (!item.classList.contains('library-item')) attachDragListeners(item);
            });

            document.querySelector(librarySearchSelector)?.addEventListener('input', event => {
                const value = event.target.value.toLowerCase();
                document.querySelectorAll(`${libraryListSelector} .settings-item`).forEach(item => {
                    const label = getItemLabel(item).toLowerCase();
                    item.style.display = label.includes(value) ? 'flex' : 'none';
                });
            });

            document.querySelectorAll('.settings-accordion-header').forEach(header => {
                header.setAttribute('role', 'button');
                header.tabIndex = 0;
                header.setAttribute('aria-expanded', String(header.parentElement?.classList.contains('open')));
                const toggleAccordion = () => {
                    const isOpen = header.parentElement?.classList.toggle('open') || false;
                    header.setAttribute('aria-expanded', String(isOpen));
                };
                header.addEventListener('click', toggleAccordion);
                header.addEventListener('keydown', event => {
                    if (event.key !== 'Enter' && event.key !== ' ') return;
                    event.preventDefault();
                    toggleAccordion();
                });
            });

            const saveButton = document.getElementById(viewSaveButtonId);
            const saveOverlay = document.getElementById(saveViewOverlayId);
            saveButton?.addEventListener('click', event => {
                event.stopPropagation();
                openSaveViewModal();
            });

            document.getElementById(closeSaveViewButtonId)?.addEventListener('click', closeSaveViewModal);
            document.getElementById(cancelSaveViewButtonId)?.addEventListener('click', closeSaveViewModal);
            document.getElementById(viewTemplateInputId)?.addEventListener('input', validateTemplateName);
            document.getElementById(confirmSaveViewButtonId)?.addEventListener('click', saveCurrentView);

            const dropdown = getViewDropdown();
            const dropdownContainer = dropdown?.closest('.view-dropdown-container');
            const menu = getViewDropdownMenu();
            if (dropdown && dropdownContainer && menu) {
                dropdown.dataset.activeTemplate = baseTemplateName;
                dropdown.setAttribute('role', 'button');
                dropdown.tabIndex = 0;
                dropdown.setAttribute('aria-expanded', 'false');

                const toggleTemplateMenu = event => {
                    event.stopPropagation();
                    const isOpen = dropdownContainer.classList.toggle('open');
                    dropdown.setAttribute('aria-expanded', String(isOpen));
                };
                dropdown.addEventListener('click', toggleTemplateMenu);
                dropdown.addEventListener('keydown', event => {
                    if (event.key !== 'Enter' && event.key !== ' ') return;
                    event.preventDefault();
                    toggleTemplateMenu(event);
                });

                menu.addEventListener('click', event => {
                    const deleteIcon = event.target.closest('.view-dropdown-delete');
                    if (deleteIcon) {
                        event.stopPropagation();
                        const item = deleteIcon.closest('.view-dropdown-item');
                        const templateName = item?.dataset.name;
                        if (!templateName) return;

                        deleteTemplate(templateName);
                        item.remove();
                        return;
                    }

                    const item = event.target.closest('.view-dropdown-item');
                    if (!item) return;

                    event.stopPropagation();
                    const templateName = item.dataset.name || item.textContent.trim();
                    updateTemplateDropdown(templateName);
                    applyView(templateName);
                    dropdownContainer.classList.remove('open');
                    dropdown.setAttribute('aria-expanded', 'false');
                });

            document.addEventListener('click', event => {
                    if (!dropdownContainer.contains(event.target)) {
                        dropdownContainer.classList.remove('open');
                        dropdown.setAttribute('aria-expanded', 'false');
                    }
            });

            document.addEventListener('keydown', event => {
                if (event.key !== 'Escape') return;
                if (saveOverlay?.classList.contains('open')) {
                    closeSaveViewModal();
                } else if (getDrawer()?.classList.contains('open')) {
                    closeDrawer();
                }
            });
            }
        }

        return {
            openDrawer,
            closeDrawer,
            attachEventListeners,
            checkSettingsChanged
        };
    }
