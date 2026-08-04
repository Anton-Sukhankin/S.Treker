import { __rest } from 'tslib';
import React from 'react';
import { useTheme } from '@10d/tend-ui-theme';
import { Root } from './styled.js';

const Sider = (_a) => {
    var { className } = _a, props = __rest(_a, ["className"]);
    const theme = useTheme();
    return (React.createElement(Root, Object.assign({}, props, { theme: theme, className: ['tend-ui-layout-sider', className].filter(Boolean).join(' ') })));
};
Sider.displayName = 'Layout.Sider';

export { Sider };
