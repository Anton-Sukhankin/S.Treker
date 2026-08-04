import React from 'react';
import { Done } from '@10d/tend-ui-icons/Done';
import { useTheme } from '@10d/tend-ui-theme';
import { Label, Input, Text } from './styled.js';

const Chip = React.memo(({ checked, value, label, onClick }) => {
    const theme = useTheme();
    const handleClick = React.useCallback((e) => {
        e.preventDefault();
        onClick(value);
    }, [onClick, value]);
    return (React.createElement(Label, { "$checked": checked, theme: theme, onClick: handleClick },
        React.createElement(Input, { type: 'checkbox' }),
        checked && React.createElement(Done, null),
        React.createElement(Text, null, label !== null && label !== void 0 ? label : value)));
});

export { Chip };
