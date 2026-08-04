'use strict';

var tslib = require('tslib');
var React = require('react');
var tendUiTheme = require('@10d/tend-ui-theme');
var styled = require('./styled.js');
var TableContext = require('../contexts/TableContext.js');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

const Th = React__default["default"].forwardRef((_a, ref) => {
    var { textAlign } = _a, props = tslib.__rest(_a, ["textAlign"]);
    const theme = tendUiTheme.useTheme();
    const config = TableContext.useTableContext();
    return (React__default["default"].createElement(styled.Root, Object.assign({}, props, { ref: ref, theme: theme, "$size": config.size, "$textAlign": textAlign })));
});
Th.displayName = 'SimpleTable.Th';

exports.Th = Th;
