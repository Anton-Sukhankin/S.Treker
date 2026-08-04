import React from 'react';
import { GroupContext } from '../../contexts/GroupContext.js';

const Group = ({ children, defaultOpen }) => {
    return (React.createElement(GroupContext.Provider, { value: React.useMemo(() => ({ defaultOpen }), [defaultOpen]) }, children));
};
Group.displayName = 'Collapse.Group';

export { Group };
