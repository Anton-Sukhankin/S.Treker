import React from 'react';
import { Root } from './styled.js';
import { useCollapseContext } from '../../contexts/CollapseContext.js';

const Header = ({ children }) => {
    const { onClick } = useCollapseContext();
    return (React.createElement(Root, { onClick: onClick, className: 'tend-ui-collapse-header' }, children));
};
Header.displayName = 'Collapse.Header';

export { Header };
