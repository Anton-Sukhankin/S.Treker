'use strict';

var tslib = require('tslib');
var React = require('react');
var tendUiTheme = require('@10d/tend-ui-theme');
var styled = require('./styled.js');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

const Content = (_a) => {
    var { className } = _a, props = tslib.__rest(_a, ["className"]);
    const theme = tendUiTheme.useTheme();
    return (React__default["default"].createElement(styled.Root, Object.assign({}, props, { theme: theme, className: ['tend-ui-layout-content', className].filter(Boolean).join(' ') })));
};
Content.displayName = 'Layout.Content';

exports.Content = Content;
