'use strict';

var React = require('react');
var Group = require('@10d/tend-ui-icons/Group');
var tendUiPrimitives = require('@10d/tend-ui-primitives');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

const GroupButton = (props) => {
    return (React__default["default"].createElement(tendUiPrimitives.ToggleButton, Object.assign({}, props),
        React__default["default"].createElement(Group.Group, null)));
};

exports.GroupButton = GroupButton;
