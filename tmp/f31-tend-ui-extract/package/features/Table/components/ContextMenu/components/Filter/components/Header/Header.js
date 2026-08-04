import React from 'react';
import { useTranslation } from '@10d/tend-ui-locale/hooks/useTranslation';
import { Text } from '@10d/tend-ui-typography';

const Header = () => {
    const t = useTranslation();
    return (React.createElement(Text, { color: 'gray650', size: 'small' }, t(['features', 'Table', 'filter'])));
};

export { Header };
