import React from 'react';
import { Box } from '@10d/tend-ui-grid';

const Layout = ({ children }) => {
    return (React.createElement(Box, { "$position": 'relative', "$display": 'flex', "$justifyContent": 'center', "$alignItems": 'center', "$width": '100%', "$height": '100%', "$gap": 64 }, children));
};

export { Layout };
