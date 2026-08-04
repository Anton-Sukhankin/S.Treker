'use strict';

var tslib = require('tslib');
var React = require('react');
var tendUiStyling = require('@10d/tend-ui-styling');
var tendUiTheme = require('@10d/tend-ui-theme');
var tendUiPrimitives = require('@10d/tend-ui-primitives');
var styled = require('./styled.js');
var Tbody = require('./Tbody/Tbody.js');
var Thead = require('./Thead/Thead.js');
var Tr = require('./Tr/Tr.js');
var Th = require('./Th/Th.js');
var Td = require('./Td/Td.js');
var TableContext = require('./contexts/TableContext.js');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

const BaseTable = React__default["default"].forwardRef((_a, ref) => {
    var { size = 'medium', loading = false } = _a, props = tslib.__rest(_a, ["size", "loading"]);
    const _b = tendUiStyling.extractMarginProps(props), { rest } = _b, marginProps = tslib.__rest(_b, ["rest"]);
    const theme = tendUiTheme.useTheme();
    return (React__default["default"].createElement(TableContext.TableContext, { value: React__default["default"].useMemo(() => ({ size }), [size]) },
        React__default["default"].createElement(tendUiPrimitives.Spinner, { color: theme.colors.blue600, size: 'small', loading: loading },
            React__default["default"].createElement(styled.Root, Object.assign({}, rest, marginProps, { ref: ref, theme: theme })))));
});
const SimpleTable = Object.assign(BaseTable, {
    displayName: 'SimpleTable',
    Thead: Thead.Thead,
    Tbody: Tbody.Tbody,
    Tr: Tr.Tr,
    Th: Th.Th,
    Td: Td.Td,
});

exports.SimpleTable = SimpleTable;
