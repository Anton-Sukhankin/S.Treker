'use strict';

var React = require('react');
var omit = require('lodash/omit');
var CheckboxGroupSearch = require('../../../CheckboxGroupSearch/CheckboxGroupSearch.js');
var Form = require('../../../Form/Form.js');
var useDisabled = require('../../hooks/useDisabled.js');
var useValuesObserver = require('../../hooks/useValuesObserver.js');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);
var omit__default = /*#__PURE__*/_interopDefault(omit);

const CheckboxGroupSearchFilter = (props) => {
    const form = Form.Form.useFormInstance();
    const values = useValuesObserver.useValuesObserver(props.config.name, form, props.INTERNAL_scope);
    const disabled = useDisabled.useDisabled(props, values);
    return (React__default["default"].createElement(CheckboxGroupSearch.CheckboxGroupSearch, Object.assign({ layout: 'vertical', disabled: disabled }, omit__default["default"](props, 'config'))));
};

exports.CheckboxGroupSearchFilter = CheckboxGroupSearchFilter;
