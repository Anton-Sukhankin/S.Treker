'use strict';

var React = require('react');
var FormContext = require('../contexts/FormContext.js');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

/**
 * @deprecated Устарело. Не использовать в продакшене
 */
const useTableForm = () => {
    const { form } = FormContext.useFormContext();
    const model = React__default["default"].useMemo(() => ({ form }), [form]);
    return model;
};

exports.useTableForm = useTableForm;
