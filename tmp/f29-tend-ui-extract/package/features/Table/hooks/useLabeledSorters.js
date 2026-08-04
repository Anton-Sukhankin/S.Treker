import React from 'react';
import groupBy from 'lodash/groupBy';

const useLabeledSorters = (sorters, columns) => {
    const grouped = React.useMemo(() => groupBy(columns, 'id'), [columns]);
    return React.useMemo(() => {
        return sorters.map(sorter => {
            const [column] = grouped[sorter.id] || [];
            const label = (sorter === null || sorter === void 0 ? void 0 : sorter.label) || (column === null || column === void 0 ? void 0 : column.label);
            return Object.assign(Object.assign({}, sorter), { label });
        });
    }, [grouped, sorters]);
};

export { useLabeledSorters };
