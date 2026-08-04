import React from 'react';
import { Box } from '@10d/tend-ui-grid';

const Layout = ({ children }) => {
    return (React.createElement(Box, { "$display": 'flex', "$alignItems": 'center', "$mb": 8 }, children));
};
Layout.displayName = 'Table.Header.Layout';

export { Layout };
