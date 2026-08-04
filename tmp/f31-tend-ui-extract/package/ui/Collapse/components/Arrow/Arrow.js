import React from 'react';
import { ChevronDown } from '@10d/tend-ui-icons/ChevronDown';
import { ChevronRight } from '@10d/tend-ui-icons/ChevronRight';
import { useCollapseContext } from '../../contexts/CollapseContext.js';

const Arrow = () => {
    const { open } = useCollapseContext();
    return open ? (React.createElement(ChevronDown, { size: 20, color: 'gray500' })) : (React.createElement(ChevronRight, { size: 20, color: 'gray500' }));
};
Arrow.displayName = 'Collapse.Arrow';

export { Arrow };
