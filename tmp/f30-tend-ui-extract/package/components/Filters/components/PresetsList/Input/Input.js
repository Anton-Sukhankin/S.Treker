import React from 'react';
import { useTheme } from '@10d/tend-ui-theme';
import { Root } from './styled.js';

const Input = React.forwardRef((props, ref) => {
    const theme = useTheme();
    return React.createElement(Root, Object.assign({}, props, { theme: theme, ref: ref }));
});

export { Input };
