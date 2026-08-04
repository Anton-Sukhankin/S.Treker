import React from 'react';
import { isNumber } from '@10d/tend-ui-utils/isNumber';
import { isString } from '@10d/tend-ui-utils/isString';
import { useTheme } from '@10d/tend-ui-theme';
import { Box } from '@10d/tend-ui-grid';
import { Badge } from '../Badge/Badge.js';
import { Root } from './styled.js';

const Segmented = React.forwardRef((props, ref) => {
    const theme = useTheme();
    const options = React.useMemo(() => props.options.map(option => {
        if (isNumber(option) || isString(option) || !('badge' in option)) {
            return option;
        }
        const { badge } = option;
        return Object.assign(Object.assign({}, option), { label: (React.createElement(Box, { as: 'span', "$display": 'inline-flex', "$gap": 8 },
                option.label,
                React.createElement(Badge, Object.assign({}, badge, { padding: '0 8px' })))) });
    }), [props.options]);
    return (React.createElement(Root, Object.assign({ "data-testid": 'tend-ui-segmented' }, props, { ref: ref, "$theme": theme, options: options, size: 'middle' })));
});
Segmented.displayName = 'Segmented';

export { Segmented };
