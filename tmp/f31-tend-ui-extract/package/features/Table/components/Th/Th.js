import { __rest } from 'tslib';
import React from 'react';
import { useTheme } from '@10d/tend-ui-theme';
import { useTourContext } from '../../contexts/TourContext.js';
import { useTableColumns } from '../../hooks/useTableColumns.js';
import { Root } from './styled.js';

const Th = (_a) => {
    var _b, _c;
    var { className } = _a, props = __rest(_a, ["className"]);
    const theme = useTheme();
    const { columns } = useTableColumns();
    const context = useTourContext();
    const id = (_b = columns[Math.floor(columns.length / 3)]) === null || _b === void 0 ? void 0 : _b.id;
    return (React.createElement(Root, Object.assign({ theme: theme }, props, { ref: id === props.id ? (_c = context === null || context === void 0 ? void 0 : context.ui) === null || _c === void 0 ? void 0 : _c.cell : undefined, className: ['tend-ui-features-table-cell', className].filter(Boolean).join(' ') })));
};
Th.displayName = 'Table.Th';

export { Th };
