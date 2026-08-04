import React from 'react';
import { Root } from './styled.js';

const TextCell = ({ children, width }) => {
    return (React.createElement(Root, { style: { width, margin: 0 }, component: 'div', ellipsis: { rows: 3, tooltip: children }, className: 'tend-ui-table-text-cell' }, children));
};
TextCell.displayName = 'Table.TextCell';

export { TextCell };
