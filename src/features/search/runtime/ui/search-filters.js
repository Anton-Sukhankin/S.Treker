function readAttributeFilter(attr) {
        const attrName = attr.dataset.attr;

        if (attrName === 'amount') {
            return {
                attrName,
                min: parseInt(attr.querySelector('.amount-min')?.value, 10) || 0,
                max: parseInt(attr.querySelector('.amount-max')?.value, 10) || Infinity
            };
        }

        if (attrName === 'contractor' || attrName === 'status' || attrName === 'specialist') {
            return {
                attrName,
                values: Array.from(attr.querySelectorAll('.attr-tag-cb:checked')).map(cb => cb.value.toLowerCase())
            };
        }

        if (attrName === 'endDate') {
            return {
                attrName,
                value: attr.querySelector('.attr-field')?.value || ''
            };
        }

        return { attrName };
    }

    function collectAttributeFilters(root = document) {
        return Array.from(root.querySelectorAll('.attribute-item')).map(readAttributeFilter);
    }

export function collectSearchFilters(options) {
        return {
            searchText: document.getElementById(options.fullTextSearchId)?.value || '',
            dateInput: document.getElementById(options.dateInputId)?.value || '',
            searchRelated: document.getElementById(options.searchRelatedToggleId)?.checked || false,
            myDocsOnly: document.getElementById(options.myDocsToggleId)?.checked || false,
            selectedPackageIds: options.selectedPackageIds,
            availablePackageIds: options.availablePackageIds,
            selectedTypes: options.selectedTypes,
            attributeFilters: collectAttributeFilters()
        };
    }

export function resetFilterValues(options) {
        const fullText = document.getElementById(options.fullTextSearchId);
        if (fullText) fullText.value = '';

        options.selectedPackageIds?.clear();
        options.selectedTypes?.clear();

        document.querySelectorAll('.esm-checkbox').forEach(checkbox => {
            checkbox.checked = false;
        });
        document.querySelectorAll('.attr-tag-cb').forEach(checkbox => {
            checkbox.checked = false;
        });

        const dateInput = document.getElementById(options.dateInputId);
        if (dateInput) dateInput.value = '';

        const myDocsToggle = document.getElementById(options.myDocsToggleId);
        if (myDocsToggle) myDocsToggle.checked = false;

        document.querySelectorAll('.attribute-item').forEach(item => {
            item.querySelectorAll('.attr-field, input[type="text"], input[type="number"]').forEach(input => {
                input.value = '';
                if (input.classList.contains('tag-hidden-input')) input.placeholder = 'Поиск...';
            });

            item.querySelectorAll('.attr-tags-wrapper').forEach(wrapper => {
                wrapper.replaceChildren();
            });
        });
    }

export function getTemplateFilterState(options) {
        return {
            fullText: document.getElementById(options.fullTextSearchId)?.value || '',
            selectedTypes: Array.from(options.selectedTypes || []),
            selectedPackages: Array.from(options.selectedPackageIds || []),
            datePeriod: document.getElementById(options.dateInputId)?.value || '',
            myDocs: document.getElementById(options.myDocsToggleId)?.checked || false,
            searchRelated: document.getElementById(options.searchRelatedToggleId)?.checked || false
        };
    }

export function applyTemplateFilterState(options, template) {
        const fullText = document.getElementById(options.fullTextSearchId);
        if (fullText) fullText.value = template.fullText || '';

        options.selectedTypes?.clear();
        (template.selectedTypes || []).forEach(type => options.selectedTypes.add(type));

        options.selectedPackageIds?.clear();
        (template.selectedPackages || []).forEach(packageId => options.selectedPackageIds.add(packageId));

        const dateInput = document.getElementById(options.dateInputId);
        if (dateInput) dateInput.value = template.datePeriod || '';

        const myDocsToggle = document.getElementById(options.myDocsToggleId);
        if (myDocsToggle) myDocsToggle.checked = template.myDocs || false;

        const searchRelatedToggle = document.getElementById(options.searchRelatedToggleId);
        if (searchRelatedToggle) searchRelatedToggle.checked = template.searchRelated || false;
    }
