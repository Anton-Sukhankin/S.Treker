import React from 'react';
import groupBy from 'lodash/groupBy';

/**
 * Groups `column` by `id` and returns single `column` by the given unique `id`
 * @returns tuple `[Column]`
 * @param columns - колонки
 */
const useColumn = (columns, 
/**
 * `Column` id
 */
id) => {
    const column = React.useMemo(() => groupBy(columns, 'id')[id] || [], [columns, id]);
    return column;
};

export { useColumn };
