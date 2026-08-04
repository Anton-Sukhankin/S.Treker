'use strict';

var pick = require('lodash/pick');
var tendUiUtils = require('@10d/tend-ui-utils');
var tendUiHooks = require('@10d/tend-ui-hooks');
var Form = require('../../Form/Form.js');
var utils = require('../utils.js');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var pick__default = /*#__PURE__*/_interopDefault(pick);

const useFiltersForm = (form, scope) => {
    const [state] = Form.Form.useForm(form);
    const getScopeState = tendUiHooks.useCallbackRef(() => {
        const result = scope ? state.getFieldValue([scope]) : state.getFieldsValue();
        return result;
    });
    const getState = tendUiHooks.useCallbackRef(() => {
        const result = state.getFieldsValue();
        return result;
    });
    const get = tendUiHooks.useCallbackRef(name => {
        const path = scope ? [scope, name] : [name];
        const result = state.getFieldValue(path);
        return result;
    });
    const set = tendUiHooks.useCallbackRef((name, payload) => {
        const path = scope ? [scope, name] : [name];
        state.setFieldValue(path, payload);
    });
    const fill = tendUiHooks.useCallbackRef((payload) => {
        state.resetFields();
        state.setFieldsValue(utils.pack(payload, scope));
    });
    const clear = tendUiHooks.useCallbackRef((name) => {
        const path = scope ? [scope, name] : [name];
        state.setFieldValue(path, undefined);
        const values = state.getFieldsValue();
        const touched = pick__default["default"](values, path.join('.'));
        return [touched, values];
    });
    const reset = tendUiHooks.useCallbackRef(() => {
        const path = [scope].filter(tendUiUtils.isString);
        state.resetFields(path.length ? path : undefined);
        const values = state.getFieldsValue();
        return values;
    });
    return { set, clear, reset, get, getState, form: state, fill, getScopeState };
};

exports.useFiltersForm = useFiltersForm;
