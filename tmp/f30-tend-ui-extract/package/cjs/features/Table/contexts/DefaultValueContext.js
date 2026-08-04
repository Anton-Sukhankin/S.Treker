'use strict';

var React = require('react');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

const DefaultValueContext = React__default["default"].createContext(undefined);
const useDefaultValueContext = () => React__default["default"].useContext(DefaultValueContext);

exports.DefaultValueContext = DefaultValueContext;
exports.useDefaultValueContext = useDefaultValueContext;
