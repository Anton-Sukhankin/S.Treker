import { __rest } from 'tslib';
import React from 'react';
import { extractMarginProps } from '@10d/tend-ui-styling';
import { useTheme } from '@10d/tend-ui-theme';
import { Spinner } from '@10d/tend-ui-primitives';
import { Root } from './styled.js';
import { Tbody } from './Tbody/Tbody.js';
import { Thead } from './Thead/Thead.js';
import { Tr } from './Tr/Tr.js';
import { Th } from './Th/Th.js';
import { Td } from './Td/Td.js';
import { TableContext } from './contexts/TableContext.js';

const BaseTable = React.forwardRef((_a, ref) => {
    var { size = 'medium', loading = false } = _a, props = __rest(_a, ["size", "loading"]);
    const _b = extractMarginProps(props), { rest } = _b, marginProps = __rest(_b, ["rest"]);
    const theme = useTheme();
    return (React.createElement(TableContext, { value: React.useMemo(() => ({ size }), [size]) },
        React.createElement(Spinner, { color: theme.colors.blue600, size: 'small', loading: loading },
            React.createElement(Root, Object.assign({}, rest, marginProps, { ref: ref, theme: theme })))));
});
const SimpleTable = Object.assign(BaseTable, {
    displayName: 'SimpleTable',
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
});

export { SimpleTable };
