import { __rest } from 'tslib';
import React from 'react';
import { useTheme } from '@10d/tend-ui-theme';
import { Root as Root$1 } from './styled.js';
import { SizeContext } from '../../contexts/SizeContext.js';

const Root = (_a) => {
    var { size = 'medium', className } = _a, props = __rest(_a, ["size", "className"]);
    const theme = useTheme();
    return (React.createElement(SizeContext, { value: { size } },
        React.createElement(Root$1, Object.assign({}, props, { theme: theme, className: ['tend-ui-layout-root', className].filter(Boolean).join(' ') }))));
};
Root.displayName = 'Layout.Root';

export { Root };
