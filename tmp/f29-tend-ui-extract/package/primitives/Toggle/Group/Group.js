import React from 'react';
import { Root } from './styled.js';

const Group = ({ layout = 'horizontal', children, className }) => {
    return (React.createElement(Root, { "$layout": layout, className: ['tend-ui-toggle-group', className].filter(Boolean).join(' ') }, children));
};
Group.displayName = 'Toggle.Group';

export { Group };
