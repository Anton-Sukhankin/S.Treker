import React from 'react';
import { Header } from '../../../../../../primitives/Layout/components/Header/Header.js';

const Root = props => {
    return React.createElement(Header, Object.assign({}, props));
};
Root.displayName = 'Layout.Header.Root';

export { Root };
