import React from 'react';
import { useTranslation } from '@10d/tend-ui-locale/hooks/useTranslation';
import { Search } from '@10d/tend-ui-icons/Search';
import { Box } from '@10d/tend-ui-grid';
import { Paragraph } from '@10d/tend-ui-typography';

const EmptyOverlay = () => {
    const t = useTranslation();
    return (React.createElement(Box, { "$display": 'flex', "$alignItems": 'center', "$justifyContent": 'center', "$gap": 8, "$height": '68px' },
        React.createElement(Search, { color: 'gray500', size: 20 }),
        React.createElement(Paragraph, { margin: '0', color: 'gray500' }, t(['general', 'empty']))));
};

export { EmptyOverlay };
