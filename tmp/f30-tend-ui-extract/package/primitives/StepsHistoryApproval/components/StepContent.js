import React from 'react';
import { Box } from '@10d/tend-ui-grid';
import { ApprovalUser } from './ApprovalUser.js';
import { TextWithLinks } from './TextWithLinks.js';

const StepContent = ({ step, showAvatar }) => (React.createElement(Box, null,
    step.user && React.createElement(ApprovalUser, { step: step, showAvatar: showAvatar }),
    step.comment && React.createElement(TextWithLinks, { text: step.comment })));

export { StepContent };
