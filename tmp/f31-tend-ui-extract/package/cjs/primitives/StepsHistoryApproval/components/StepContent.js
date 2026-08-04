'use strict';

var React = require('react');
var tendUiGrid = require('@10d/tend-ui-grid');
var ApprovalUser = require('./ApprovalUser.js');
var TextWithLinks = require('./TextWithLinks.js');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

const StepContent = ({ step, showAvatar }) => (React__default["default"].createElement(tendUiGrid.Box, null,
    step.user && React__default["default"].createElement(ApprovalUser.ApprovalUser, { step: step, showAvatar: showAvatar }),
    step.comment && React__default["default"].createElement(TextWithLinks.TextWithLinks, { text: step.comment })));

exports.StepContent = StepContent;
