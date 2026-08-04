import React from 'react';
import { Root } from './styled.js';
import { Group } from './Group.js';

const BaseCheckbox = React.forwardRef((props, ref) => {
    return React.createElement(Root, Object.assign({ "data-testid": 'tend-ui-checkbox' }, props, { ref: ref }));
});
const Checkbox = Object.assign(BaseCheckbox, {
    displayName: 'Checkbox',
    Group,
});

export { Checkbox };
