import React from 'react';
import { useTheme } from '@10d/tend-ui-theme';
import { Root } from './styled.js';

const Tbody = React.forwardRef((props, ref) => {
    const theme = useTheme();
    return React.createElement(Root, Object.assign({}, props, { ref: ref, theme: theme }));
});
Tbody.displayName = 'SimpleTable.Tbody';

export { Tbody };
