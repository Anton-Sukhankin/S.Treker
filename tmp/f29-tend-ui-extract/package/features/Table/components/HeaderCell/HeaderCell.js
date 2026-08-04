import { __rest } from 'tslib';
import React from 'react';
import { useTheme } from '@10d/tend-ui-theme';
import { CellTitle } from '../CellTitle/CellTitle.js';
import { Root } from './styled.js';

const HeaderCell = (_a) => {
    var { className, id = '' } = _a, props = __rest(_a, ["className", "id"]);
    const theme = useTheme();
    return (React.createElement(Root, Object.assign({ theme: theme }, props, { className: ['tend-ui-features-table-cell', className].filter(Boolean).join(' ') }),
        React.createElement(CellTitle, { id: id }, props.children)));
};
HeaderCell.displayName = 'Table.HeaderCell';

export { HeaderCell };
