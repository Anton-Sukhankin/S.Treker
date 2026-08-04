'use strict';

var tslib = require('tslib');
var React = require('react');
var tendUiTheme = require('@10d/tend-ui-theme');
var styled = require('./styled.js');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

const Scrollable = React__default["default"].forwardRef((_a, ref) => {
    var { maxHeight = '200px', className } = _a, props = tslib.__rest(_a, ["maxHeight", "className"]);
    const theme = tendUiTheme.useTheme();
    return (React__default["default"].createElement(styled.Root, Object.assign({}, props, { ref: ref, "$theme": theme, "$maxHeight": maxHeight, className: ['tend-ui-scrollable', className].filter(Boolean).join(' ') })));
});
Scrollable.displayName = 'Scrollable';

exports.Scrollable = Scrollable;
