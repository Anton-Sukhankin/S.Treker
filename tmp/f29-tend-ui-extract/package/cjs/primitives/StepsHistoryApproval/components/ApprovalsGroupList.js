'use strict';

var React = require('react');
var tendUiGrid = require('@10d/tend-ui-grid');
var Collapse = require('../../../ui/Collapse/Collapse.js');
var ApprovalUser = require('./ApprovalUser.js');
var GroupLabel = require('./GroupLabel.js');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

const ApprovalsGroupList = ({ list, showAvatar }) => {
    return (React__default["default"].createElement(React__default["default"].Fragment, null, list === null || list === void 0 ? void 0 : list.map(item => (React__default["default"].createElement(tendUiGrid.Box, { key: item.group.id },
        React__default["default"].createElement(Collapse.Collapse, { arrowPosition: 'end', label: React__default["default"].createElement(GroupLabel.GroupLabel, { group: item.group, showAvatar: showAvatar }) }, item.group.users.map(user => (React__default["default"].createElement(tendUiGrid.Box, { "$ml": 16, key: user.id },
            React__default["default"].createElement(ApprovalUser.ApprovalUser, { step: { user }, showAvatar: showAvatar }))))))))));
};

exports.ApprovalsGroupList = ApprovalsGroupList;
