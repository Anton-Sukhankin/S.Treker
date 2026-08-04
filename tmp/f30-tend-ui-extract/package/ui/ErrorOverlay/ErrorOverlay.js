import React from 'react';
import { useTranslation } from '@10d/tend-ui-locale/hooks/useTranslation';
import { Cancel } from '@10d/tend-ui-icons/Cancel';
import { Box } from '@10d/tend-ui-grid';
import { Paragraph } from '@10d/tend-ui-typography';

const ErrorOverlay = () => {
    const t = useTranslation();
    return (React.createElement(Box, { "$display": 'flex', "$alignItems": 'center', "$justifyContent": 'center', "$flexDirection": 'column', "$gap": 4, "$height": '68px' },
        React.createElement(Cancel, { color: 'red600', size: 20 }),
        React.createElement(Paragraph, { margin: '0', color: 'red600' }, t(['general', 'error']))));
};

export { ErrorOverlay };
