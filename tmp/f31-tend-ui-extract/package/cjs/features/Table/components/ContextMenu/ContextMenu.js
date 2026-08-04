'use strict';

var React = require('react');
var tendUiUtils = require('@10d/tend-ui-utils');
var Dropdown = require('../../../../primitives/Dropdown/Dropdown.js');
var useBoolean = require('../../../../hooks/useBoolean/useBoolean.js');
var useTableColumns = require('../../hooks/useTableColumns.js');
var tendUiGrid = require('@10d/tend-ui-grid');
var useColumn = require('../../hooks/useColumn.js');
var Divider$1 = require('../../../../ui/Divider/Divider.js');
var useTableFilters = require('../../hooks/useTableFilters.js');
var useFilter = require('../../hooks/useFilter.js');
var useScopedFilters = require('../../hooks/useScopedFilters.js');
var useSorter = require('../../hooks/useSorter.js');
var useTableSorters = require('../../hooks/useTableSorters.js');
var useScopedSorters = require('../../hooks/useScopedSorters.js');
var ColumnActions = require('./components/Actions/ColumnActions.js');
var Filter = require('./components/Filter/Filter.js');
var Sorter = require('./components/Sorter/Sorter.js');
var ColumnContext = require('./contexts/ColumnContext.js');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

const Divider = () => React__default["default"].createElement(Divider$1.Divider, { margin: '12px 0', padding: '0' });
const overlayStyle = {
    minWidth: 245,
};
// TODO: Перенести в tend-ui-utils
const isObject = (value) => typeof value === 'object';
const divided = (node, index) => {
    return index === 0 ? (node) : (React__default["default"].createElement(React__default["default"].Fragment, null,
        React__default["default"].createElement(Divider, null),
        node));
};
const Content = ({ children, content, }) => {
    if (tendUiUtils.isUndefined(content))
        return (React__default["default"].createElement(tendUiGrid.Box, { "$display": 'flex', "$flexDirection": 'column', "$gap": 8, "$width": 245 }, children));
    return (React__default["default"].createElement(tendUiGrid.Box, { "$display": 'flex', "$flexDirection": 'column', "$gap": 8, "$width": 245 }, content));
};
const BaseContextMenu = ({ id = '', children, content, }) => {
    const [open, onOpenChange] = useBoolean.useBoolean();
    const { columns } = useTableColumns.useTableColumns();
    const [column] = useColumn.useColumn(columns, id);
    const [sorter] = useScopedSorters.useScopedSorters(useSorter.useSorter(useTableSorters.useTableSorters().sorters, column === null || column === void 0 ? void 0 : column.id));
    const [filter] = useScopedFilters.useScopedFilters(useFilter.useFilter(useTableFilters.useTableFilters().filters, column === null || column === void 0 ? void 0 : column.id));
    if (!column)
        return React__default["default"].createElement(React__default["default"].Fragment, null, children);
    return (React__default["default"].createElement(Dropdown.Dropdown, { trigger: ['click'], open: open, overlayStyle: overlayStyle, content: React__default["default"].createElement(ColumnContext.ColumnsContext, { value: column },
            React__default["default"].createElement(Content, { content: content }, [
                sorter && React__default["default"].createElement(Sorter.Sorter, null),
                filter && React__default["default"].createElement(Filter.Filter, null),
                React__default["default"].createElement(ColumnActions.ColumnActions, { key: `features-table-column-actions-${id}` }),
            ]
                .filter(isObject)
                .map(divided))), onOpenChange: onOpenChange }, children));
};
const ContextMenu = Object.assign(BaseContextMenu, {
    displayName: 'Table.ContextMenu',
    Sorter: Sorter.Sorter,
    Filter: Filter.Filter,
    ColumnActions: ColumnActions.ColumnActions,
    Divider,
});

exports.ContextMenu = ContextMenu;
