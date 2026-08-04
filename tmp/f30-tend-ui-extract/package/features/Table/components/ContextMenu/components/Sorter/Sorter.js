import React from 'react';
import { useColumnContext } from '../../contexts/ColumnContext.js';
import { Root } from './components/Root/Root.js';
import { ToggleSorter } from './components/ToggleSorter/ToggleSorter.js';

const Sorter = () => {
    const column = useColumnContext();
    return (React.createElement(Root, { column: column },
        React.createElement(ToggleSorter, null,
            React.createElement(ToggleSorter.Layout, null,
                React.createElement(ToggleSorter.Descending, null),
                React.createElement(ToggleSorter.Ascending, null)))));
};
Sorter.displayName = 'ContextMenu.Sorter';
Sorter.Root = Root;
Sorter.ToggleSorter = ToggleSorter;

export { Sorter };
