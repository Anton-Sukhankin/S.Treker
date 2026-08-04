'use strict';

var React = require('react');
var Done = require('@10d/tend-ui-icons/Done');
var tendUiTheme = require('@10d/tend-ui-theme');
var styled = require('./styled.js');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

const Chip = React__default["default"].memo(({ checked, value, label, onClick }) => {
    const theme = tendUiTheme.useTheme();
    const handleClick = React__default["default"].useCallback((e) => {
        e.preventDefault();
        onClick(value);
    }, [onClick, value]);
    return (React__default["default"].createElement(styled.Label, { "$checked": checked, theme: theme, onClick: handleClick },
        React__default["default"].createElement(styled.Input, { type: 'checkbox' }),
        checked && React__default["default"].createElement(Done.Done, null),
        React__default["default"].createElement(styled.Text, null, label !== null && label !== void 0 ? label : value)));
});

exports.Chip = Chip;
