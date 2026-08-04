import React from 'react';
import { useFiltersContext } from '../contexts/FiltersContext.js';

const useTableFilters = () => {
    const { filters, clear, reset } = useFiltersContext();
    const api = React.useMemo(() => ({
        filters,
        clear,
        reset,
    }), [clear, filters, reset]);
    return api;
};

export { useTableFilters };
