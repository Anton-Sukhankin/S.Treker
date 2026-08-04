import React from 'react';
import { Avatar } from '../../primitives/Avatar/Avatar.js';
import { Dropdown } from '../../primitives/Dropdown/Dropdown.js';
import { Box } from '@10d/tend-ui-grid';
import { Text } from '@10d/tend-ui-typography';

const overlayStyle = { minWidth: '256px' };
const Profile = ({ title, description, items, avatar }) => {
    const menu = React.useMemo(() => {
        const node = {
            disabled: true,
            key: 'profile-avatar-menu-item',
            label: (React.createElement(Box, { "$display": 'flex', "$alignItems": 'center', "$gap": 12 },
                React.createElement(Avatar, Object.assign({}, avatar, { size: 'medium' })),
                React.createElement(Box, { "$display": 'flex', "$flexDirection": 'column' },
                    React.createElement(Text, { size: 'large' }, title),
                    React.createElement(Text, { size: 'small', color: 'gray500' }, description)))),
        };
        const divider = {
            type: 'divider',
        };
        if (!items || !items.length)
            return {
                items: [node],
            };
        const nodes = [node, divider];
        const result = nodes.concat(items);
        return {
            items: result,
        };
    }, [avatar, description, items, title]);
    return (React.createElement(Dropdown, { items: menu.items, trigger: ['click'], overlayStyle: overlayStyle },
        React.createElement(Avatar, Object.assign({}, avatar, { size: 'small', pointer: true }))));
};
Profile.displayName = 'Profile';

export { Profile };
