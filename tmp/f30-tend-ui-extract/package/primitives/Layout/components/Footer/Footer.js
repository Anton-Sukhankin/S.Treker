import { __rest } from 'tslib';
import React from 'react';
import { useTheme } from '@10d/tend-ui-theme';
import { Root } from './styled.js';

const Footer = (_a) => {
    var { children, className } = _a, props = __rest(_a, ["children", "className"]);
    const theme = useTheme();
    return (React.createElement(Root, Object.assign({}, props, { className: ['tend-ui-layout-footer', className].filter(Boolean).join(' '), theme: theme }), children));
};
Footer.displayName = 'Layout.Footer';

export { Footer };
