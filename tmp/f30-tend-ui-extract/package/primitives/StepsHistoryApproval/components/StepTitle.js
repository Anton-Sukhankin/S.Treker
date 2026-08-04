import React from 'react';
import { Text } from '@10d/tend-ui-typography';
import { Box } from '@10d/tend-ui-grid/Box';
import { Tooltip } from '@10d/tend-ui-primitives';

const StepTitle = ({ title, subTitle, created, stepType }) => (React.createElement(Box, { "$display": 'flex', "$justifyContent": 'space-between', "$alignItems": 'center', "$mb": 8 },
    React.createElement(Box, { "$display": 'flex', "$flexDirection": 'column' },
        React.createElement(Tooltip, { title: title },
            React.createElement(Text, { ellipsis: true, color: stepType === 'cancel' ? 'gray900' : 'gray650', size: 'large' }, title)),
        subTitle && (React.createElement(Text, { ellipsis: true, color: 'gray400', size: 'small' }, subTitle))),
    React.createElement(Box, { "$minWidth": 130 },
        React.createElement(Text, { color: 'gray400', className: 'steps-created-date' }, created))));

export { StepTitle };
