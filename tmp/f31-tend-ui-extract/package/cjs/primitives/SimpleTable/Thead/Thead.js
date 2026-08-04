'use strict';

var React = require('react');
var tendUiTheme = require('@10d/tend-ui-theme');
var styled = require('./styled.js');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

const Thead = React__default["default"].forwardRef((props, ref) => {
    const theme = tendUiTheme.useTheme();
    return React__default["default"].createElement(styled.Root, Object.assign({}, props, { ref: ref, theme: theme }));
});
Thead.displayName = 'SimpleTable.Thead';

exports.Thead = Thead;
