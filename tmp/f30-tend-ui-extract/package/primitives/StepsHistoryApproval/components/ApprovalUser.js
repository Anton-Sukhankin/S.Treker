import React from 'react';
import { Text } from '@10d/tend-ui-typography';
import { isString } from '@10d/tend-ui-utils/isString';
import { Tooltip } from '@10d/tend-ui-primitives';
import { Box } from '@10d/tend-ui-grid';
import { Avatar } from '../../Avatar/Avatar.js';
import { useTheme } from '@10d/tend-ui-theme';
import { UsersGroup } from './UsersGroup.js';
import { ApprovalUserContainer, CustomAvatar } from './styled.js';
import { CopyEmail } from './CopyEmail.js';

const ApprovalUser = ({ step, src, showAvatar }) => {
    var _a, _b, _c, _d, _e, _f;
    const theme = useTheme();
    const group = 'group' in step ? step.group : undefined;
    const fullName = `${isString((_a = step === null || step === void 0 ? void 0 : step.user) === null || _a === void 0 ? void 0 : _a.firstName) ? step.user.firstName[0] : ''}${isString((_b = step === null || step === void 0 ? void 0 : step.user) === null || _b === void 0 ? void 0 : _b.lastName) ? step.user.lastName[0] : ''}`;
    const name = fullName || undefined;
    return (React.createElement(ApprovalUserContainer, { "$display": 'flex', "$alignItems": 'center', "$gap": 16, "$mb": 8, className: 'approval-user-container' },
        showAvatar && (React.createElement(Box, { "$position": 'relative' },
            React.createElement(Tooltip, { title: (_c = step.user) === null || _c === void 0 ? void 0 : _c.username },
                React.createElement(Avatar, { pointer: true, src: src }, name !== null && name !== void 0 ? name : undefined)),
            (group === null || group === void 0 ? void 0 : group.name) && (React.createElement(Tooltip, { title: group.name },
                React.createElement(CustomAvatar, { "$theme": theme, "$position": 'absolute' },
                    React.createElement(UsersGroup, null)))))),
        React.createElement(Box, { "$display": 'flex', "$flexDirection": 'column' },
            ((_d = step.user) === null || _d === void 0 ? void 0 : _d.username) && (React.createElement(Box, { "$display": 'flex', "$alignItems": 'center' },
                React.createElement(Text, { color: 'gray900', mr: 4, fontWeight: 600 }, step.user.username),
                !showAvatar && (group === null || group === void 0 ? void 0 : group.name) && (React.createElement(Tooltip, { title: group === null || group === void 0 ? void 0 : group.name },
                    React.createElement(CustomAvatar, { "$theme": theme, "$position": 'static' },
                        React.createElement(UsersGroup, null)))))),
            ((_e = step.user) === null || _e === void 0 ? void 0 : _e.position) && React.createElement(Text, { color: 'gray400' }, step.user.position),
            ((_f = step.user) === null || _f === void 0 ? void 0 : _f.email) && React.createElement(CopyEmail, { email: step.user.email }))));
};

export { ApprovalUser };
