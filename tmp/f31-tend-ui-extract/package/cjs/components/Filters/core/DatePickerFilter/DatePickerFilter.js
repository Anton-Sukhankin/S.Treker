'use strict';

var React = require('react');
var omit = require('lodash/omit');
var DatePicker = require('../../../../primitives/DatePicker/DatePicker.js');
var Form = require('../../../Form/Form.js');
var useDisabled = require('../../hooks/useDisabled.js');
var useValuesObserver = require('../../hooks/useValuesObserver.js');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);
var omit__default = /*#__PURE__*/_interopDefault(omit);

const DatePickerFilter = (props) => {
    const form = Form.Form.useFormInstance();
    const values = useValuesObserver.useValuesObserver(props.config.name, form, props.INTERNAL_scope);
    const disabled = useDisabled.useDisabled(props, values);
    return React__default["default"].createElement(DatePicker.DatePicker, Object.assign({ fullWidth: true, disabled: disabled }, omit__default["default"](props, 'config')));
};

exports.DatePickerFilter = DatePickerFilter;
