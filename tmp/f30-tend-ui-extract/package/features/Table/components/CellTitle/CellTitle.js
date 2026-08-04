import React from 'react';
import { Box } from '@10d/tend-ui-grid';
import { useScopedFilters } from '../../hooks/useScopedFilters.js';
import { useTableSorters } from '../../hooks/useTableSorters.js';
import { useScopedSorters } from '../../hooks/useScopedSorters.js';
import { useSorter } from '../../hooks/useSorter.js';
import { useFilter } from '../../hooks/useFilter.js';
import { useTableFilters } from '../../hooks/useTableFilters.js';
import { FilterIndicator } from './components/FilterIndicator/FilterIndicator.js';
import { SorterIndicator } from './components/SorterIndicator/SorterIndicator.js';

const BaseCellTitle = ({ id, children }) => {
    const [sorter] = useScopedSorters(useSorter(useTableSorters().sorters, id));
    const [filter] = useScopedFilters(useFilter(useTableFilters().filters, id));
    if (!sorter && !filter)
        return React.createElement(React.Fragment, null, children);
    return (React.createElement(Box, { "$display": 'flex', "$alignItems": 'center', "$gap": 4 },
        children,
        filter && React.createElement(FilterIndicator, { id: id }),
        sorter && React.createElement(SorterIndicator, { id: id })));
};
const CellTitle = Object.assign(BaseCellTitle, {
    displayName: 'Table.CellTitle',
    FilterIndicator,
    SorterIndicator,
});

export { CellTitle };
