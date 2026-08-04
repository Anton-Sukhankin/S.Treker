import React from 'react';
import { Box } from '@10d/tend-ui-grid';

const List = ({ children, gap = 8 }) => {
    return (React.createElement(Box, { "data-testid": 'tend-ui-filters-list', "$display": 'flex', "$flexDirection": 'column', "$gap": gap }, children));
};
List.displayName = 'Filters.List';

export { List };
