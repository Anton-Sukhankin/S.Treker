import React from 'react';
import { Group } from '@10d/tend-ui-icons/Group';
import { ToggleButton } from '@10d/tend-ui-primitives';

const GroupButton = (props) => {
    return (React.createElement(ToggleButton, Object.assign({}, props),
        React.createElement(Group, null)));
};

export { GroupButton };
