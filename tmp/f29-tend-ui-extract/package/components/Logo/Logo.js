import React from 'react';
import { Text } from '@10d/tend-ui-typography';
import { Box } from '@10d/tend-ui-grid';

const Logo = ({ before, after, children, className, onClick }) => {
    return (React.createElement(Box, { "$display": 'flex', "$alignItems": 'center', "$gap": 8, "$padding": '6px 4px', "$pointer": !!onClick, className: ['tend-ui-logo', className].filter(Boolean).join(' '), onClick: onClick },
        before,
        React.createElement(Text, { style: { display: 'block', whiteSpace: 'nowrap' }, strong: true }, children),
        after));
};
Logo.displayName = 'Logo';

export { Logo };
