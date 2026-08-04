'use strict';

var tslib = require('tslib');
var React = require('react');
var tendUiTheme = require('@10d/tend-ui-theme');
var styled = require('./styled.js');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

const Tr = React__default["default"].forwardRef((_a, ref) => {
    var { selected = false } = _a, props = tslib.__rest(_a, ["selected"]);
    const theme = tendUiTheme.useTheme();
    return React__default["default"].createElement(styled.Root, Object.assign({}, props, { ref: ref, theme: theme, "$selected": selected }));
});
Tr.displayName = 'SimpleTable.Tr';

exports.Tr = Tr;
