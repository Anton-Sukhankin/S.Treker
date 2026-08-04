'use strict';

var React = require('react');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

/**
 * @description HOC passes a React "className" property to a given property name
 * in order to style off-DOM-rendered elements with "styled-components"
 */
const withInjectedClassName = (Component, propertyName) => {
    return React__default["default"].forwardRef((props, ref) => {
        const property = [props[propertyName], props.className].filter(Boolean).join(' ');
        return React__default["default"].createElement(Component, Object.assign({ ref: ref }, props, { [propertyName]: property }));
    });
};

exports.withInjectedClassName = withInjectedClassName;
