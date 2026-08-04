import React from 'react';
import { Root } from './styled.js';

const TextHeader = ({ children, width }) => {
    return (React.createElement(Root, { style: { width, margin: 0 }, component: 'div', ellipsis: { rows: 1, tooltip: children }, className: 'tend-ui-table-text-header' }, children));
};
TextHeader.displayName = 'Table.TextHeader';

export { TextHeader };
