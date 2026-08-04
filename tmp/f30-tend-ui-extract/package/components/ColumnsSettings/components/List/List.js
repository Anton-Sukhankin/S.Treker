import React from 'react';
import { SortableContext } from '@dnd-kit/sortable';
import { Box } from '@10d/tend-ui-grid';

const List = ({ columns, children, gap = 8, }) => {
    return (React.createElement(SortableContext, { items: columns },
        React.createElement(Box, { "data-testid": 'tend-ui-columns-settings-list', "$display": 'flex', "$flexDirection": 'column', "$gap": gap }, children)));
};

export { List };
