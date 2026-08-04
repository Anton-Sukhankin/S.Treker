import React from 'react';

const Root = ({ children }) => {
    return React.createElement(React.Fragment, null, children);
};
Root.displayName = 'Table.Toolbar.Root';

export { Root };
