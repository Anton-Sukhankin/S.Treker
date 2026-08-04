import React from 'react';
import { Box } from '@10d/tend-ui-grid';
import { Collapse } from '../../../ui/Collapse/Collapse.js';
import { ApprovalUser } from './ApprovalUser.js';
import { GroupLabel } from './GroupLabel.js';

const ApprovalsGroupList = ({ list, showAvatar }) => {
    return (React.createElement(React.Fragment, null, list === null || list === void 0 ? void 0 : list.map(item => (React.createElement(Box, { key: item.group.id },
        React.createElement(Collapse, { arrowPosition: 'end', label: React.createElement(GroupLabel, { group: item.group, showAvatar: showAvatar }) }, item.group.users.map(user => (React.createElement(Box, { "$ml": 16, key: user.id },
            React.createElement(ApprovalUser, { step: { user }, showAvatar: showAvatar }))))))))));
};

export { ApprovalsGroupList };
