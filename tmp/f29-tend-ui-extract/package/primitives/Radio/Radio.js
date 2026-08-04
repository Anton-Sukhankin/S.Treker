import React from 'react';
import { useTheme } from '@10d/tend-ui-theme';
import { Group } from './components/Group/Group.js';
import { Root } from './styled.js';

const BaseRadio = (props, ref) => {
    const theme = useTheme();
    return React.createElement(Root, Object.assign({ "data-testid": 'tend-ui-radio' }, props, { ref: ref, "$theme": theme }));
};
const ForwardedRadio = React.forwardRef(BaseRadio);
const Radio = Object.assign(ForwardedRadio, {
    displayName: 'Radio',
    Group,
    Button: Root.Button,
});

export { Radio };
