'use strict';

var React = require('react');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

const DatePickerVisibilityContext = React__default["default"].createContext(undefined);
const useDatePickerVisibilityContext = () => React__default["default"].useContext(DatePickerVisibilityContext);

exports.DatePickerVisibilityContext = DatePickerVisibilityContext;
exports.useDatePickerVisibilityContext = useDatePickerVisibilityContext;
