import React from 'react';
import { Root } from './styled.js';

const Navigation = (props) => {
    return React.createElement(Root, Object.assign({}, props));
};
Navigation.displayName = 'Layout.Header.Navigation';

export { Navigation };
