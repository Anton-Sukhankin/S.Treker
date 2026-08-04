import { __rest } from 'tslib';
import React from 'react';
import { useTheme } from '@10d/tend-ui-theme';
import { Root } from './styled.js';

const Tr = React.forwardRef((_a, ref) => {
    var { selected = false } = _a, props = __rest(_a, ["selected"]);
    const theme = useTheme();
    return React.createElement(Root, Object.assign({}, props, { ref: ref, theme: theme, "$selected": selected }));
});
Tr.displayName = 'SimpleTable.Tr';

export { Tr };
