import React from 'react';
import { useSortersContext } from '../contexts/SortersContext.js';

const useTableSorters = () => {
    const { sorters } = useSortersContext();
    const model = React.useMemo(() => ({
        sorters,
    }), [sorters]);
    return model;
};

export { useTableSorters };
