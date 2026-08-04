'use strict';

var React = require('react');
var AntConfigProvider = require('antd-core/es/config-provider');
var tendUiLocale = require('@10d/tend-ui-locale');
var tendUiTheme = require('@10d/tend-ui-theme');
var utils = require('./utils.js');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);
var AntConfigProvider__default = /*#__PURE__*/_interopDefault(AntConfigProvider);

const ConfigProvider = ({ children }) => {
    const theme = tendUiTheme.useTheme();
    const locale = tendUiLocale.useLocale();
    return (React__default["default"].createElement(AntConfigProvider__default["default"], { prefixCls: 'tend-ui', locale: locale, theme: utils.createAntdTheme(theme) }, children));
};

exports.ConfigProvider = ConfigProvider;
