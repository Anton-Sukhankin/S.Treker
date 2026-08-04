import React from 'react';
import { FilterAlt } from '@10d/tend-ui-icons/FilterAlt';
import { useTheme } from '@10d/tend-ui-theme';
import { FilterListIcon } from './styled.js';

const useColumns = (columns) => {
    const theme = useTheme();
    const filterIcon = React.useCallback(() => React.createElement(FilterAlt, null), []);
    const sortIcon = React.useCallback((props) => {
        return React.createElement(FilterListIcon, { "$theme": theme, "$sortOrder": props.sortOrder });
    }, [theme]);
    if (!columns)
        return [];
    return columns.map(column => {
        return Object.assign(Object.assign({}, column), { filterIcon,
            sortIcon });
    });
};

export { useColumns };
