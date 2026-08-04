'use strict';

var React = require('react');
var tendUiTypography = require('@10d/tend-ui-typography');
var isString = require('@10d/tend-ui-utils/isString');
var tendUiPrimitives = require('@10d/tend-ui-primitives');
var tendUiGrid = require('@10d/tend-ui-grid');
var Avatar = require('../../Avatar/Avatar.js');
var tendUiTheme = require('@10d/tend-ui-theme');
var UsersGroup = require('./UsersGroup.js');
var styled = require('./styled.js');
var CopyEmail = require('./CopyEmail.js');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

const ApprovalUser = ({ step, src, showAvatar }) => {
    var _a, _b, _c, _d, _e, _f;
    const theme = tendUiTheme.useTheme();
    const group = 'group' in step ? step.group : undefined;
    const fullName = `${isString.isString((_a = step === null || step === void 0 ? void 0 : step.user) === null || _a === void 0 ? void 0 : _a.firstName) ? step.user.firstName[0] : ''}${isString.isString((_b = step === null || step === void 0 ? void 0 : step.user) === null || _b === void 0 ? void 0 : _b.lastName) ? step.user.lastName[0] : ''}`;
    const name = fullName || undefined;
    return (React__default["default"].createElement(styled.ApprovalUserContainer, { "$display": 'flex', "$alignItems": 'center', "$gap": 16, "$mb": 8, className: 'approval-user-container' },
        showAvatar && (React__default["default"].createElement(tendUiGrid.Box, { "$position": 'relative' },
            React__default["default"].createElement(tendUiPrimitives.Tooltip, { title: (_c = step.user) === null || _c === void 0 ? void 0 : _c.username },
                React__default["default"].createElement(Avatar.Avatar, { pointer: true, src: src }, name !== null && name !== void 0 ? name : undefined)),
            (group === null || group === void 0 ? void 0 : group.name) && (React__default["default"].createElement(tendUiPrimitives.Tooltip, { title: group.name },
                React__default["default"].createElement(styled.CustomAvatar, { "$theme": theme, "$position": 'absolute' },
                    React__default["default"].createElement(UsersGroup.UsersGroup, null)))))),
        React__default["default"].createElement(tendUiGrid.Box, { "$display": 'flex', "$flexDirection": 'column' },
            ((_d = step.user) === null || _d === void 0 ? void 0 : _d.username) && (React__default["default"].createElement(tendUiGrid.Box, { "$display": 'flex', "$alignItems": 'center' },
                React__default["default"].createElement(tendUiTypography.Text, { color: 'gray900', mr: 4, fontWeight: 600 }, step.user.username),
                !showAvatar && (group === null || group === void 0 ? void 0 : group.name) && (React__default["default"].createElement(tendUiPrimitives.Tooltip, { title: group === null || group === void 0 ? void 0 : group.name },
                    React__default["default"].createElement(styled.CustomAvatar, { "$theme": theme, "$position": 'static' },
                        React__default["default"].createElement(UsersGroup.UsersGroup, null)))))),
            ((_e = step.user) === null || _e === void 0 ? void 0 : _e.position) && React__default["default"].createElement(tendUiTypography.Text, { color: 'gray400' }, step.user.position),
            ((_f = step.user) === null || _f === void 0 ? void 0 : _f.email) && React__default["default"].createElement(CopyEmail.CopyEmail, { email: step.user.email }))));
};

exports.ApprovalUser = ApprovalUser;
