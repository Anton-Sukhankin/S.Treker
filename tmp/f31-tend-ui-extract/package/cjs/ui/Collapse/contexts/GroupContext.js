'use strict';

var React = require('react');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

const GroupContext = React__default["default"].createContext(undefined);
const useGroupContext = () => React__default["default"].useContext(GroupContext);

exports.GroupContext = GroupContext;
exports.useGroupContext = useGroupContext;
