import React from 'react';
import { isUndefined } from '@10d/tend-ui-utils';
import { Dropdown } from '../../../../primitives/Dropdown/Dropdown.js';
import { useBoolean } from '../../../../hooks/useBoolean/useBoolean.js';
import { useTableColumns } from '../../hooks/useTableColumns.js';
import { Box } from '@10d/tend-ui-grid';
import { useColumn } from '../../hooks/useColumn.js';
import { Divider as Divider$1 } from '../../../../ui/Divider/Divider.js';
import { useTableFilters } from '../../hooks/useTableFilters.js';
import { useFilter } from '../../hooks/useFilter.js';
import { useScopedFilters } from '../../hooks/useScopedFilters.js';
import { useSorter } from '../../hooks/useSorter.js';
import { useTableSorters } from '../../hooks/useTableSorters.js';
import { useScopedSorters } from '../../hooks/useScopedSorters.js';
import { ColumnActions } from './components/Actions/ColumnActions.js';
import { Filter } from './components/Filter/Filter.js';
import { Sorter } from './components/Sorter/Sorter.js';
import { ColumnsContext } from './contexts/ColumnContext.js';

const Divider = () => React.createElement(Divider$1, { margin: '12px 0', padding: '0' });
const overlayStyle = {
    minWidth: 245,
};
// TODO: Перенести в tend-ui-utils
const isObject = (value) => typeof value === 'object';
const divided = (node, index) => {
    return index === 0 ? (node) : (React.createElement(React.Fragment, null,
        React.createElement(Divider, null),
        node));
};
const Content = ({ children, content, }) => {
    if (isUndefined(content))
        return (React.createElement(Box, { "$display": 'flex', "$flexDirection": 'column', "$gap": 8, "$width": 245 }, children));
    return (React.createElement(Box, { "$display": 'flex', "$flexDirection": 'column', "$gap": 8, "$width": 245 }, content));
};
const BaseContextMenu = ({ id = '', children, content, }) => {
    const [open, onOpenChange] = useBoolean();
    const { columns } = useTableColumns();
    const [column] = useColumn(columns, id);
    const [sorter] = useScopedSorters(useSorter(useTableSorters().sorters, column === null || column === void 0 ? void 0 : column.id));
    const [filter] = useScopedFilters(useFilter(useTableFilters().filters, column === null || column === void 0 ? void 0 : column.id));
    if (!column)
        return React.createElement(React.Fragment, null, children);
    return (React.createElement(Dropdown, { trigger: ['click'], open: open, overlayStyle: overlayStyle, content: React.createElement(ColumnsContext, { value: column },
            React.createElement(Content, { content: content }, [
                sorter && React.createElement(Sorter, null),
                filter && React.createElement(Filter, null),
                React.createElement(ColumnActions, { key: `features-table-column-actions-${id}` }),
            ]
                .filter(isObject)
                .map(divided))), onOpenChange: onOpenChange }, children));
};
const ContextMenu = Object.assign(BaseContextMenu, {
    displayName: 'Table.ContextMenu',
    Sorter,
    Filter,
    ColumnActions,
    Divider,
});

export { ContextMenu };
