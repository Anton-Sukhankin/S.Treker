function normalizeText(value) {
        return (value || '').toString().toLowerCase();
    }

    function toIsoDateFromDisplay(value) {
        if (!value) return '';

        const parts = value.split('.');
        if (parts.length !== 3) return value;

        const day = parts[0];
        const month = parts[1];
        const year = parts[2];

        return `${year}-${month}-${day}`;
    }

    function toComparableDisplayDate(value) {
        const isoDate = toIsoDateFromDisplay(value);
        return /^\d{4}-\d{2}-\d{2}$/.test(isoDate) ? isoDate : '';
    }

    function matchesDisplayDateOrRange(documentDate, filterValue) {
        if (!filterValue) return true;

        const [startValue, endValue] = filterValue.split(/\s+[—–-]\s+/);
        const documentComparable = toComparableDisplayDate(documentDate);
        const startComparable = toComparableDisplayDate(startValue);
        const endComparable = toComparableDisplayDate(endValue);

        if (!documentComparable || !startComparable) return false;
        if (!endComparable) return documentComparable === startComparable;
        return documentComparable >= startComparable && documentComparable <= endComparable;
    }

    function matchesAttributeFilter(doc, filter) {
        if (filter.attrName === 'amount') {
            const min = filter.min ?? 0;
            const max = filter.max ?? Infinity;
            return doc.amount >= min && doc.amount <= max;
        }

        if (filter.attrName === 'contractor' || filter.attrName === 'status' || filter.attrName === 'specialist') {
            if (!filter.values || filter.values.length === 0) return true;

            const docValue = normalizeText(doc[filter.attrName]);
            return filter.values.includes(docValue);
        }

        if (filter.attrName === 'endDate') {
            return matchesDisplayDateOrRange(doc.endDate, filter.value);
        }

        return true;
    }

export function matchesDocumentFilters(doc, filters) {
        const searchText = normalizeText(filters.searchText);
        const matchesText = !searchText
            || normalizeText(doc.number).includes(searchText)
            || normalizeText(doc.name).includes(searchText);

        const matchesType = filters.selectedTypes.size === 0 || filters.selectedTypes.has(doc.docType);
        const documentPackageIds = new Set([
            doc.packageId,
            ...(Array.isArray(doc.packageIds) ? doc.packageIds : [])
        ].filter(Boolean));
        const allAvailablePackagesSelected = filters.availablePackageIds?.size > 0
            && Array.from(filters.availablePackageIds).every(packageId => filters.selectedPackageIds.has(packageId));
        const matchesPackage = filters.selectedPackageIds.size === 0
            || allAvailablePackagesSelected
            || Array.from(filters.selectedPackageIds).some(packageId => documentPackageIds.has(packageId));
        const matchesDate = matchesDisplayDateOrRange(doc.docDate, filters.dateInput);
        const matchesMyDocs = !filters.myDocsOnly || doc.myDocument === true;
        const matchesAttrs = filters.attributeFilters.every(filter => matchesAttributeFilter(doc, filter));

        return matchesText && matchesType && matchesPackage && matchesDate && matchesMyDocs && matchesAttrs;
    }

export function getSecondaryConnectionDocs(allDocuments, primaryDocuments, options = {}) {
        const normalizedOptions = typeof options === 'function'
            ? { isDocumentAvailable: options }
            : options;
        const excludedNumbers = new Set(normalizedOptions.excludedNumbers || []);
        const excludeDocument = normalizedOptions.excludeDocument;
        const isDocumentAvailable = normalizedOptions.isDocumentAvailable;
        const relatedNumbers = new Set();
        primaryDocuments.forEach(doc => {
            if (doc.relatedDocs) doc.relatedDocs.forEach(number => relatedNumbers.add(number));
        });

        primaryDocuments.forEach(doc => excludedNumbers.add(doc.number));

        return allDocuments.filter(doc =>
            relatedNumbers.has(doc.number)
            && !excludedNumbers.has(doc.number)
            && (typeof excludeDocument !== 'function' || !excludeDocument(doc))
            && (typeof isDocumentAvailable !== 'function' || isDocumentAvailable(doc))
        );
    }
