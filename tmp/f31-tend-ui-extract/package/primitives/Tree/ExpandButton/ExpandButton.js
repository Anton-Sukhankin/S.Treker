import React from 'react';
import { Add } from '@10d/tend-ui-icons/Add';
import { Remove } from '@10d/tend-ui-icons/Remove';
import { useTheme } from '@10d/tend-ui-theme';
import { Button } from './styled.js';

const ExpandButton = ({ expanded }) => {
    const theme = useTheme();
    const content = expanded ? React.createElement(Remove, { size: 9 }) : React.createElement(Add, { size: 9 });
    return React.createElement(Button, { theme: theme }, content);
};

export { ExpandButton };
