import React from 'react';

const Root = ({ children }) => {
    return React.createElement(React.Fragment, null, children);
};
Root.displayName = 'Table.ContextMenu.Root';

export { Root };
