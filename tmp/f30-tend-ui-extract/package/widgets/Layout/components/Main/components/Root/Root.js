import React from 'react';
import { Main } from '../../../../../../primitives/Layout/components/Main/Main.js';

const Root = (props) => {
    return React.createElement(Main, Object.assign({}, props));
};
Root.displayName = 'Layout.Main.Root';

export { Root };
