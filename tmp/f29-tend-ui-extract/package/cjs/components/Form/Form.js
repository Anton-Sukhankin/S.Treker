'use strict';

var tslib = require('tslib');
var React = require('react');
var AntForm = require('antd-core/es/form');
var Item = require('./components/Item/Item.js');
var styled = require('./styled.js');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);
var AntForm__default = /*#__PURE__*/_interopDefault(AntForm);

const BaseForm = (_a, ref) => {
    var { layout = 'vertical', gap } = _a, props = tslib.__rest(_a, ["layout", "gap"]);
    return (React__default["default"].createElement(styled.Root, Object.assign({ "data-testid": 'tend-ui-form' }, props, { ref: ref, "$gap": gap, layout: layout })));
};
const ForwardedForm = React__default["default"].forwardRef(BaseForm);
const Form = Object.assign(ForwardedForm, {
    Item: Item.Item,
    useForm: AntForm__default["default"].useForm,
    useFormInstance: AntForm__default["default"].useFormInstance,
    useWatch: AntForm__default["default"].useWatch,
    ErrorList: AntForm__default["default"].ErrorList,
    List: AntForm__default["default"].List,
    Provider: AntForm__default["default"].Provider,
    displayName: 'Form',
});

exports.Form = Form;
