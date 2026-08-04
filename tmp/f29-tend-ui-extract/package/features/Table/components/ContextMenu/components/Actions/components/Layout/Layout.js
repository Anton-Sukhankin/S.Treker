import React from 'react';
import { List } from '../../../../../../../../ui/List/List.js';

const Layout = ({ children }) => {
    return React.createElement(List, null, children);
};
Layout.displayName = 'Table.ContextMenu.Actions.Layout';

export { Layout };
