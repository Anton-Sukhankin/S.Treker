import { __rest } from 'tslib';
import React from 'react';
import { useTheme } from '@10d/tend-ui-theme';
import { Root } from './styled.js';
import { useTableContext } from '../contexts/TableContext.js';

const Th = React.forwardRef((_a, ref) => {
    var { textAlign } = _a, props = __rest(_a, ["textAlign"]);
    const theme = useTheme();
    const config = useTableContext();
    return (React.createElement(Root, Object.assign({}, props, { ref: ref, theme: theme, "$size": config.size, "$textAlign": textAlign })));
});
Th.displayName = 'SimpleTable.Th';

export { Th };
