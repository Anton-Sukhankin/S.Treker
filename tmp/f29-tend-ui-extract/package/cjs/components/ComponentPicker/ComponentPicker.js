'use strict';

var React = require('react');
var omit = require('lodash/omit');
var Checkbox = require('../../primitives/Checkbox/Checkbox.js');
var tendUiPrimitives = require('@10d/tend-ui-primitives');
var Select = require('../../primitives/Select/Select.js');
var DatePicker = require('../../primitives/DatePicker/DatePicker.js');
var Toggle = require('../../primitives/Toggle/Toggle.js');
var RangePicker = require('../../primitives/RangePicker/RangePicker.js');
var Radio = require('../../primitives/Radio/Radio.js');
var AsyncSelect = require('../AsyncSelect/AsyncSelect.js');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);
var omit__default = /*#__PURE__*/_interopDefault(omit);

const ComponentPicker = React__default["default"].memo(props => {
    switch (props.component) {
        case 'input': {
            const rest = omit__default["default"](props, 'component');
            return React__default["default"].createElement(tendUiPrimitives.Input, Object.assign({}, rest));
        }
        case 'select': {
            const rest = omit__default["default"](props, 'component');
            return React__default["default"].createElement(Select.Select, Object.assign({ fullWidth: true }, rest));
        }
        case 'async-select': {
            const rest = omit__default["default"](props, 'component');
            return React__default["default"].createElement(AsyncSelect.AsyncSelect, Object.assign({ fullWidth: true }, rest));
        }
        case 'toggle': {
            const rest = omit__default["default"](props, 'component');
            return React__default["default"].createElement(Toggle.Toggle, Object.assign({}, rest));
        }
        case 'checkbox': {
            const rest = omit__default["default"](props, 'component');
            return React__default["default"].createElement(Checkbox.Checkbox, Object.assign({}, rest));
        }
        case 'checkbox-group': {
            const rest = omit__default["default"](props, 'component');
            return React__default["default"].createElement(Checkbox.Checkbox.Group, Object.assign({ layout: 'vertical' }, rest));
        }
        case 'radio': {
            const rest = omit__default["default"](props, 'component');
            return React__default["default"].createElement(Radio.Radio, Object.assign({}, rest));
        }
        case 'radio-group': {
            const rest = omit__default["default"](props, 'component');
            return React__default["default"].createElement(Radio.Radio.Group, Object.assign({ layout: 'vertical' }, rest));
        }
        case 'date-picker': {
            const rest = omit__default["default"](props, 'component');
            return React__default["default"].createElement(DatePicker.DatePicker, Object.assign({ fullWidth: true }, rest));
        }
        case 'range-picker': {
            const rest = omit__default["default"](props, 'component');
            return React__default["default"].createElement(RangePicker.RangePicker, Object.assign({ fullWidth: true }, rest));
        }
        default:
            return React__default["default"].createElement("span", null, "Component is not supported");
    }
});
ComponentPicker.displayName = 'ComponentPicker';

exports.ComponentPicker = ComponentPicker;
