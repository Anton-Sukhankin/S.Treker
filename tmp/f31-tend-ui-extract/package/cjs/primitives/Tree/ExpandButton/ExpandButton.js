'use strict';

var React = require('react');
var Add = require('@10d/tend-ui-icons/Add');
var Remove = require('@10d/tend-ui-icons/Remove');
var tendUiTheme = require('@10d/tend-ui-theme');
var styled = require('./styled.js');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

const ExpandButton = ({ expanded }) => {
    const theme = tendUiTheme.useTheme();
    const content = expanded ? React__default["default"].createElement(Remove.Remove, { size: 9 }) : React__default["default"].createElement(Add.Add, { size: 9 });
    return React__default["default"].createElement(styled.Button, { theme: theme }, content);
};

exports.ExpandButton = ExpandButton;
