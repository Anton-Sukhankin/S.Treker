'use strict';

var tslib = require('tslib');
var React = require('react');
var tendUiTheme = require('@10d/tend-ui-theme');
var styled = require('./styled.js');
var SizeContext = require('../../contexts/SizeContext.js');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

const Root = (_a) => {
    var { size = 'medium', className } = _a, props = tslib.__rest(_a, ["size", "className"]);
    const theme = tendUiTheme.useTheme();
    return (React__default["default"].createElement(SizeContext.SizeContext, { value: { size } },
        React__default["default"].createElement(styled.Root, Object.assign({}, props, { theme: theme, className: ['tend-ui-layout-root', className].filter(Boolean).join(' ') }))));
};
Root.displayName = 'Layout.Root';

exports.Root = Root;
