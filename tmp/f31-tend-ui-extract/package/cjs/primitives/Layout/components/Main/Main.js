'use strict';

var tslib = require('tslib');
var React = require('react');
var tendUiTheme = require('@10d/tend-ui-theme');
var styled = require('./styled.js');
var SizeContext = require('../../contexts/SizeContext.js');
var Title = require('./components/Title/Title.js');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

const Main = (_a) => {
    var { children, className, background = 'white' } = _a, props = tslib.__rest(_a, ["children", "className", "background"]);
    const theme = tendUiTheme.useTheme();
    const { size } = SizeContext.useSizeContext();
    return (React__default["default"].createElement(styled.Root, Object.assign({}, props, { theme: theme, "$size": size, "$background": background, className: ['tend-ui-layout-main', className].filter(Boolean).join(' ') }), children));
};
Main.Title = Title.Title;
Main.displayName = 'Layout.Main';

exports.Main = Main;
