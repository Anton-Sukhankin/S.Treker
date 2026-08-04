import { __rest } from 'tslib';
import React from 'react';
import { useTheme } from '@10d/tend-ui-theme';
import { Root } from './styled.js';

const Scrollable = React.forwardRef((_a, ref) => {
    var { maxHeight = '200px', className } = _a, props = __rest(_a, ["maxHeight", "className"]);
    const theme = useTheme();
    return (React.createElement(Root, Object.assign({}, props, { ref: ref, "$theme": theme, "$maxHeight": maxHeight, className: ['tend-ui-scrollable', className].filter(Boolean).join(' ') })));
});
Scrollable.displayName = 'Scrollable';

export { Scrollable };
