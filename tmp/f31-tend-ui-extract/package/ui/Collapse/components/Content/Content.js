import React from 'react';
import { useTheme } from '@10d/tend-ui-theme';
import { Box } from '@10d/tend-ui-grid';
import { Root } from './styled.js';
import { useCollapseContext } from '../../contexts/CollapseContext.js';

const Content = ({ children }) => {
    const context = useCollapseContext();
    const theme = useTheme();
    return (React.createElement(Root, { theme: theme, "$open": context.open, "data-state": context.open.toString(), className: 'tend-ui-collapse-content' },
        React.createElement(Box, { "$padding": '8px 0 0 24px' }, children)));
};
Content.displayName = 'Collapse.Content';

export { Content };
