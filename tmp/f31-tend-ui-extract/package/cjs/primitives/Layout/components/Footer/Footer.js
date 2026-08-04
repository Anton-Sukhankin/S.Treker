'use strict';

var tslib = require('tslib');
var React = require('react');
var tendUiTheme = require('@10d/tend-ui-theme');
var styled = require('./styled.js');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

const Footer = (_a) => {
    var { children, className } = _a, props = tslib.__rest(_a, ["children", "className"]);
    const theme = tendUiTheme.useTheme();
    return (React__default["default"].createElement(styled.Root, Object.assign({}, props, { className: ['tend-ui-layout-footer', className].filter(Boolean).join(' '), theme: theme }), children));
};
Footer.displayName = 'Layout.Footer';

exports.Footer = Footer;
