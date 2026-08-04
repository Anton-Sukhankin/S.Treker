'use strict';

var React = require('react');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

const ValueContext = React__default["default"].createContext(undefined);
const useValueContext = () => React__default["default"].useContext(ValueContext);

exports.ValueContext = ValueContext;
exports.useValueContext = useValueContext;
