'use strict';

var tslib = require('tslib');
var React = require('react');
var AntConfigProvider = require('antd-core/es/config-provider');
var AntTable = require('antd-core/es/table');
var tendUiPrimitives = require('@10d/tend-ui-primitives');
var tendUiTheme = require('@10d/tend-ui-theme');
var cn = require('classnames');
var styled = require('./styled.js');
var useColumns = require('./hooks/useColumns.js');
var useSize = require('./hooks/useSize.js');
var TextHeader = require('./components/TextHeader/TextHeader.js');
var TextCell = require('./components/TextCell/TextCell.js');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);
var AntConfigProvider__default = /*#__PURE__*/_interopDefault(AntConfigProvider);
var AntTable__default = /*#__PURE__*/_interopDefault(AntTable);
var cn__default = /*#__PURE__*/_interopDefault(cn);

const BaseTable = (_a, ref) => {
    var _b, _c;
    var { size = 'medium', empty, loading = false } = _a, props = tslib.__rest(_a, ["size", "empty", "loading"]);
    const theme = tendUiTheme.useTheme();
    const __size = useSize.useSize(size);
    const columns = useColumns.useColumns(props.columns);
    const isRowCursorPointer = typeof ((_c = (_b = props === null || props === void 0 ? void 0 : props.onRow) === null || _b === void 0 ? void 0 : _b.call(props, {})) === null || _c === void 0 ? void 0 : _c.onClick) === 'function';
    const renderEmpty = React__default["default"].useCallback(() => React__default["default"].createElement(tendUiPrimitives.Empty, Object.assign({ description: '\u041D\u0435\u0442 \u0434\u0430\u043D\u043D\u044B\u0445' }, empty)), [empty]);
    const __loading = React__default["default"].useMemo(() => ({ indicator: React__default["default"].createElement(tendUiPrimitives.Spinner, { size: 'small', loading: loading }), spinning: loading }), [loading]);
    return (React__default["default"].createElement(AntConfigProvider__default["default"], { renderEmpty: renderEmpty },
        React__default["default"].createElement(styled.Root, Object.assign({ "data-testid": 'tend-ui-table' }, props, { "$theme": theme, "$pointer": isRowCursorPointer, ref: ref, "$size": size, size: __size, columns: columns, loading: __loading, rootClassName: cn__default["default"]([props.rootClassName], {
                'tend-ui-table-large': __size === 'large',
            }), pagination: false }))));
};
const _Table = React__default["default"].forwardRef(BaseTable);
const Table = Object.assign(_Table, {
    displayName: 'Table',
    TextCell: TextCell.TextCell,
    TextHeader: TextHeader.TextHeader,
    Summary: AntTable__default["default"].Summary,
});

exports.Table = Table;
