import React from 'react';
import groupBy from 'lodash/groupBy';

/**
 * @returns tuple `[SorterConfig]`
 * @description Groups `SorterConfig` by `id` and returns single `SorterConfig` by the given unique `id`
 */
const useSorter = (sorters, 
/**
 * @description `Column` id
 */
id) => {
    const sorter = React.useMemo(() => groupBy(sorters, 'id')[id] || [], [sorters, id]);
    return sorter;
};

export { useSorter };
