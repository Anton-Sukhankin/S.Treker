'use strict';

var tslib = require('tslib');
var React = require('react');
var tendUiTheme = require('@10d/tend-ui-theme');
var TourContext = require('../../contexts/TourContext.js');
var useTableColumns = require('../../hooks/useTableColumns.js');
var styled = require('./styled.js');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

const Th = (_a) => {
    var _b, _c;
    var { className } = _a, props = tslib.__rest(_a, ["className"]);
    const theme = tendUiTheme.useTheme();
    const { columns } = useTableColumns.useTableColumns();
    const context = TourContext.useTourContext();
    const id = (_b = columns[Math.floor(columns.length / 3)]) === null || _b === void 0 ? void 0 : _b.id;
    return (React__default["default"].createElement(styled.Root, Object.assign({ theme: theme }, props, { ref: id === props.id ? (_c = context === null || context === void 0 ? void 0 : context.ui) === null || _c === void 0 ? void 0 : _c.cell : undefined, className: ['tend-ui-features-table-cell', className].filter(Boolean).join(' ') })));
};
Th.displayName = 'Table.Th';

exports.Th = Th;
