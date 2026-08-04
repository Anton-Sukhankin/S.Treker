'use strict';

var tslib = require('tslib');
var React = require('react');
var tendUiStyling = require('@10d/tend-ui-styling');
var tendUiTheme = require('@10d/tend-ui-theme');
var styled = require('./styled.js');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

const levelMap = {
    h1: 1,
    h2: 2,
    h3: 3,
    h4: 4,
    h5: 5,
    d1: 1,
    d2: 1,
};
const Title = React__default["default"].forwardRef((_a, ref) => {
    var { level = 'h1', uppercase, color, textAlign } = _a, props = tslib.__rest(_a, ["level", "uppercase", "color", "textAlign"]);
    const _color = tendUiTheme.useColor(color);
    const _b = tendUiStyling.extractMarginProps(props), { rest } = _b, marginProps = tslib.__rest(_b, ["rest"]);
    return (React__default["default"].createElement(styled.Root, Object.assign({ "data-testid": 'tend-ui-title' }, rest, marginProps, { ref: ref, "$level": level, "$uppercase": uppercase, "$color": _color, "$textAlign": textAlign, level: levelMap[level] })));
});
Title.displayName = 'Title';

exports.Title = Title;
