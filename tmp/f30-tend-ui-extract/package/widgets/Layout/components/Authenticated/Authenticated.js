import React from 'react';
import { useLayoutContext } from '../../contexts/LayoutContext.js';

const Authenticated = ({ children, fallback = null }) => {
    const { authenticated } = useLayoutContext();
    return authenticated ? React.createElement(React.Fragment, null, children) : React.createElement(React.Fragment, null, fallback);
};
Authenticated.displayName = 'Layout.Authenticated';

export { Authenticated };
