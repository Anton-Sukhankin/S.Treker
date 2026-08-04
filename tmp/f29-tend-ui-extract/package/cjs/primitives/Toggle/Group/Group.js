'use strict';

var React = require('react');
var styled = require('./styled.js');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

const Group = ({ layout = 'horizontal', children, className }) => {
    return (React__default["default"].createElement(styled.Root, { "$layout": layout, className: ['tend-ui-toggle-group', className].filter(Boolean).join(' ') }, children));
};
Group.displayName = 'Toggle.Group';

exports.Group = Group;
