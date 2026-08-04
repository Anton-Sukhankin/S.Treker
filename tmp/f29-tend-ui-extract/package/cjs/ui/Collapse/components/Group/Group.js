'use strict';

var React = require('react');
var GroupContext = require('../../contexts/GroupContext.js');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

const Group = ({ children, defaultOpen }) => {
    return (React__default["default"].createElement(GroupContext.GroupContext.Provider, { value: React__default["default"].useMemo(() => ({ defaultOpen }), [defaultOpen]) }, children));
};
Group.displayName = 'Collapse.Group';

exports.Group = Group;
