'use strict';

var React = require('react');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

const DatePickerContext = React__default["default"].createContext(undefined);
const useDatePickerContext = () => React__default["default"].useContext(DatePickerContext);

exports.DatePickerContext = DatePickerContext;
exports.useDatePickerContext = useDatePickerContext;
