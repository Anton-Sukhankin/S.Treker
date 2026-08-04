export function createDocumentSelectionController(elements = {}) {
        const selectedIds = new Set();

        function getElement(ref) {
            if (!ref) return null;
            if (typeof ref === 'string') return document.getElementById(ref);
            return ref;
        }

        function getCount() {
            return selectedIds.size;
        }

        function has(id) {
            return selectedIds.has(id);
        }

        function clear() {
            selectedIds.clear();
        }

        function retainDocuments(documents) {
            const availableIds = new Set((Array.isArray(documents) ? documents : []).map(doc => doc.number));
            selectedIds.forEach(id => {
                if (!availableIds.has(id)) selectedIds.delete(id);
            });
        }

        function getSelectedDocuments(documents) {
            const sourceDocuments = Array.isArray(documents) ? documents : [];
            return sourceDocuments.filter(doc => selectedIds.has(doc.number));
        }

        function applyPackageToSelected(documents, packageIds) {
            const sourceDocuments = Array.isArray(documents) ? documents : [];
            sourceDocuments.forEach(doc => {
                if (!selectedIds.has(doc.number)) return;
                doc.packageId = packageIds[0];
                doc.packageIds = packageIds;
            });
        }

        function setMarkedForDeletion(documents, marked) {
            const sourceDocuments = Array.isArray(documents) ? documents : [];
            sourceDocuments.forEach(doc => {
                if (selectedIds.has(doc.number)) {
                    doc.markedForDeletion = marked;
                }
            });
        }

        function syncFloatingBar(documents) {
            const bar = getElement(elements.bar);
            const countDisplay = getElement(elements.countDisplay);
            const unmarkButton = getElement(elements.unmarkButton);
            const count = getCount();

            if (!bar || !countDisplay) return;
            countDisplay.textContent = String(count);

            if (count > 0) {
                bar.classList.add('visible');

                const sourceDocuments = Array.isArray(documents) ? documents : [];
                const hasMarked = sourceDocuments.some(doc => selectedIds.has(doc.number) && doc.markedForDeletion);
                if (unmarkButton) unmarkButton.style.display = hasMarked ? 'flex' : 'none';
            } else {
                bar.classList.remove('visible');
            }
        }

        return Object.freeze({
            selectedIds,
            getCount,
            has,
            clear,
            retainDocuments,
            getSelectedDocuments,
            applyPackageToSelected,
            setMarkedForDeletion,
            syncFloatingBar
        });
    }
