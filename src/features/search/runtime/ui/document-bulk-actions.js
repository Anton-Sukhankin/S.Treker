function getElement(ref) {
        if (!ref) return null;
        if (typeof ref === 'string') return document.getElementById(ref);
        return ref;
    }

    function setDisabled(button, disabled) {
        if (!button) return;
        button.disabled = disabled;
        button.classList.toggle('disabled', disabled);
    }

export function bindDocumentBulkActions(options) {
        const selection = options.selection;
        const moveModal = getElement(options.moveModal);
        const moveCount = getElement(options.moveCount);
        const applyMoveButton = getElement(options.applyMoveButton);
        const bulkMoveButton = getElement(options.bulkMoveButton);
        const closeMoveButton = getElement(options.closeMoveButton);
        const cancelMoveButton = getElement(options.cancelMoveButton);
        const bulkDeleteButton = getElement(options.bulkDeleteButton);
        const bulkUnmarkButton = getElement(options.bulkUnmarkButton);
        const bulkResetButton = getElement(options.bulkResetButton);
        const bulkCollectRelationsButton = getElement(options.bulkCollectRelationsButton);
        let returnFocusElement = null;

        function openMoveModal() {
            returnFocusElement = document.activeElement instanceof HTMLElement ? document.activeElement : null;
            moveModal?.classList.add('open');
            moveModal?.setAttribute('aria-hidden', 'false');
            moveModal?.removeAttribute('inert');
            closeMoveButton?.focus();
        }

        function closeMoveModal() {
            moveModal?.classList.remove('open');
            moveModal?.setAttribute('aria-hidden', 'true');
            moveModal?.setAttribute('inert', '');
            if (returnFocusElement?.isConnected) returnFocusElement.focus();
            returnFocusElement = null;
        }

        function documents() {
            return options.getDocuments?.() || [];
        }

        function syncFloatingBar() {
            selection.syncFloatingBar(documents());
        }

        bulkMoveButton?.addEventListener('click', () => {
            if (selection.getCount() === 0) return;

            if (moveCount) moveCount.textContent = selection.getCount();
            options.resetMoveTarget?.();
            setDisabled(applyMoveButton, true);
            options.renderPackageSelector?.();
            openMoveModal();
        });

        closeMoveButton?.addEventListener('click', closeMoveModal);

        cancelMoveButton?.addEventListener('click', closeMoveModal);

        applyMoveButton?.addEventListener('click', () => {
            const targetIds = options.getMoveTargetIds?.() || [];
            if (targetIds.length === 0) return;

            const count = selection.getCount();
            const displayNames = targetIds
                .map(id => options.getPackageName?.(id))
                .filter(Boolean)
                .join(', ');

            selection.applyPackageToSelected(documents(), targetIds);
            options.applyFilters?.();
            syncFloatingBar();
            closeMoveModal();
            options.showToast?.(
                'Документы добавлены',
                `${count} ${options.getPluralForm(count, 'позиция была добавлена', 'позиции были добавлены', 'позиций были добавлены')} в пакет(ы): "${displayNames}"`
            );
        });

        bulkDeleteButton?.addEventListener('click', () => {
            const count = selection.getCount();
            if (count === 0) return;

            selection.setMarkedForDeletion(documents(), true);
            selection.clear();
            options.applyFilters?.();
            syncFloatingBar();
            options.showToast?.('Пометка на удаление', `Выбранные строки (${count}) отмечены на удаление`);
        });

        bulkUnmarkButton?.addEventListener('click', () => {
            const count = selection.getCount();
            if (count === 0) return;

            selection.setMarkedForDeletion(documents(), false);
            selection.clear();
            options.applyFilters?.();
            syncFloatingBar();
            options.showToast?.('Снятие пометки', `С выбранных строк (${count}) снята пометка на удаление`);
        });

        bulkResetButton?.addEventListener('click', () => {
            selection.clear();
            options.renderCurrentTable?.();
            syncFloatingBar();
        });

        bulkCollectRelationsButton?.addEventListener('click', () => {
            if (selection.getCount() === 0) return;

            options.openRelatedDrawer?.(selection.getSelectedDocuments(documents()));
        });

        document.addEventListener('keydown', event => {
            if (event.key === 'Escape' && moveModal?.classList.contains('open')) closeMoveModal();
        });
    }
