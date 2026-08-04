'use strict';

var tslib = require('tslib');
var React = require('react');
var AntSwitch = require('antd-core/es/switch');
var tendUiTypography = require('@10d/tend-ui-typography');
var styled = require('./styled.js');
var Group = require('./Group/Group.js');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);
var AntSwitch__default = /*#__PURE__*/_interopDefault(AntSwitch);

const BaseToggle = React__default["default"].forwardRef((_a, ref) => {
    var _b;
    var { children, className, style, UNSTABLE_styling } = _a, props = tslib.__rest(_a, ["children", "className", "style", "UNSTABLE_styling"]);
    return (React__default["default"].createElement(styled.Container, { className: className, style: style, "$disabled": props.disabled },
        React__default["default"].createElement(AntSwitch__default["default"], Object.assign({ "data-testid": 'tend-ui-toggle' }, props, { ref: ref })),
        React__default["default"].createElement(tendUiTypography.Text, { disabled: props.disabled, strong: (_b = UNSTABLE_styling === null || UNSTABLE_styling === void 0 ? void 0 : UNSTABLE_styling.Text) === null || _b === void 0 ? void 0 : _b.strong }, children)));
});
const Toggle = Object.assign(BaseToggle, {
    displayName: 'Toggle',
    Group: Group.Group,
});

exports.Toggle = Toggle;
