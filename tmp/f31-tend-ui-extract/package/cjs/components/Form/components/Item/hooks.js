'use strict';

var React = require('react');
var AntForm = require('antd-core/es/form');
var Error = require('@10d/tend-ui-icons/Error');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);
var AntForm__default = /*#__PURE__*/_interopDefault(AntForm);

const composeMessage = (rule) => (Object.assign(Object.assign({}, rule), { message: (React__default["default"].createElement(React__default["default"].Fragment, null,
        React__default["default"].createElement(Error.Error, { "data-testid": 'error-icon', size: 16 }),
        " ",
        rule.message)) }));
const useErrorMessagePrefix = (rules) => {
    const form = AntForm__default["default"].useFormInstance();
    return React__default["default"].useMemo(() => {
        return rules === null || rules === void 0 ? void 0 : rules.map(rule => {
            if (typeof rule === 'function') {
                return composeMessage(rule(form));
            }
            return composeMessage(rule);
        });
    }, [form, rules]);
};

exports.useErrorMessagePrefix = useErrorMessagePrefix;
