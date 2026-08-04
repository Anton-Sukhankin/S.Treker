'use strict';

var React = require('react');
var tendUiTheme = require('@10d/tend-ui-theme');
var styled = require('./styled.js');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

const Divider = ({ variant = 'horizontal', margin, padding, height, color, }) => {
    const theme = tendUiTheme.useTheme();
    // FIXME: Найти способ поправить литеральные типы
    const _color = tendUiTheme.useColor(color);
    const isVertical = variant === 'vertical';
    const as = isVertical ? 'div' : 'hr';
    return (React__default["default"].createElement(styled.Root, { theme: theme, as: as, "$type": variant, "$margin": margin, "$padding": padding, "$height": height, "$color": _color }));
};

exports.Divider = Divider;
