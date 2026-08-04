export function parseDateCustom(dateStr) {
        if (!dateStr) return 0;

        const parts = dateStr.trim().split('.');
        if (parts.length !== 3) return 0;

        const day = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10);
        const year = parseInt(parts[2], 10);

        return new Date(year, month - 1, day).getTime();
    }

    export function sortDocuments(data, options = {}) {
        const sortField = options.sortField;
        const sortDir = options.sortDir || 'asc';
        if (!sortField) return data;

        return [...data].sort((a, b) => {
            let valA;
            let valB;

            if (sortField === 'date') {
                valA = parseDateCustom(a.docDate);
                valB = parseDateCustom(b.docDate);
            } else if (sortField === 'changed') {
                valA = parseDateCustom(a.lastChange);
                valB = parseDateCustom(b.lastChange);
            } else if (sortField === 'number') {
                valA = a.number || '';
                valB = b.number || '';
                return sortDir === 'asc'
                    ? valA.localeCompare(valB, undefined, { numeric: true })
                    : valB.localeCompare(valA, undefined, { numeric: true });
            } else if (sortField === 'name') {
                valA = a.name ? a.name.toLowerCase() : '';
                valB = b.name ? b.name.toLowerCase() : '';
                return sortDir === 'asc'
                    ? valA.localeCompare(valB)
                    : valB.localeCompare(valA);
            }

            if (valA < valB) return sortDir === 'asc' ? -1 : 1;
            if (valA > valB) return sortDir === 'asc' ? 1 : -1;
            return 0;
        });
    }

    export function getPageItems(data, options) {
        const currentPage = options.currentPage;
        const pageSize = options.pageSize;
        const start = (currentPage - 1) * pageSize;
        const end = start + pageSize;

        return data.slice(start, end);
    }

    export function getTotalPages(totalItems, pageSize) {
        return Math.ceil(totalItems / pageSize);
    }
