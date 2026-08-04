'use strict';

var tslib = require('tslib');
var React = require('react');
var tendUiTheme = require('@10d/tend-ui-theme');
var styled = require('./styled.js');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

const Divider = (_a) => {
    var { margin, color } = _a, props = tslib.__rest(_a, ["margin", "color"]);
    // FIXME: Найти способ поправить литеральные типы
    const _color = tendUiTheme.useColor(color);
    return (React__default["default"].createElement(styled.Root, Object.assign({ "data-testid": 'tend-ui-divider' }, props, { "$margin": margin, "$color": _color })));
};
Divider.displayName = 'Divider';

exports.Divider = Divider;
