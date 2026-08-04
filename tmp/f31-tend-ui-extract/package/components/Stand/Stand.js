import React from 'react';
import { Tag } from '@10d/tend-ui-primitives';
import { Text } from '@10d/tend-ui-typography';

const labels = {
    dev: 'DEV',
    stage: 'STAGE',
    prod: 'PROD',
};
const colors = {
    dev: {
        color: 'red700',
        bg: 'red200',
    },
    stage: {
        color: 'gold700',
        bg: 'gold200',
    },
    prod: {
        color: 'cyan700',
        bg: 'cyan200',
    },
};
const Stand = ({ stand }) => {
    return (React.createElement(Tag, { "data-testid": 'tend-ui-stand', padding: '0 4px', backgroundColor: colors[stand].bg, borderRadius: 4 },
        React.createElement(Text, { color: colors[stand].color, size: 'xs', uppercase: true, wordBreak: 'normal', fontWeight: 600 }, labels[stand])));
};
Stand.displayName = 'Stand';

export { Stand };
