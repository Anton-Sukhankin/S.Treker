'use strict';

var React = require('react');
var LayoutContext = require('../../contexts/LayoutContext.js');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

const Authenticated = ({ children, fallback = null }) => {
    const { authenticated } = LayoutContext.useLayoutContext();
    return authenticated ? React__default["default"].createElement(React__default["default"].Fragment, null, children) : React__default["default"].createElement(React__default["default"].Fragment, null, fallback);
};
Authenticated.displayName = 'Layout.Authenticated';

exports.Authenticated = Authenticated;
