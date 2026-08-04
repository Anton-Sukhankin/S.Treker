import React from 'react';
import { Box } from '@10d/tend-ui-grid';

const Section = ({ children }) => {
    return (React.createElement(Box, { "$display": 'flex', "$alignItems": 'center', "$gap": 4 }, children));
};
Section.displayName = 'Layout.Header.Section';

export { Section };
