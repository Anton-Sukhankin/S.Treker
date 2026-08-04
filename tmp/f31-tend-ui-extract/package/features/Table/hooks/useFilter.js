import React from 'react';
import groupBy from 'lodash/groupBy';

/**
 * @returns tuple `[Filter]` or `[]`
 * @description Groups `filters` by `id` and returns single `filter` by the given unique `id`
 */
const useFilter = (filters, id) => {
    const config = React.useMemo(() => groupBy(filters, 'id')[id] || [], [filters, id]);
    return config;
};

export { useFilter };
