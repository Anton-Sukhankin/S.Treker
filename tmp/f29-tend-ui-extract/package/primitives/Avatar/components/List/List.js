import { __rest } from 'tslib';
import React from 'react';
import { isUndefined } from '@10d/tend-ui-utils';
import { Avatar } from '../Avatar/Avatar.js';
import { Root } from './styled.js';

const List = React.forwardRef((_a, ref) => {
    var { children, max } = _a, props = __rest(_a, ["children", "max"]);
    const _children = React.useMemo(() => {
        if (isUndefined(max))
            return children;
        const nodes = React.Children.map(children, child => child);
        if (!nodes)
            return children;
        const amount = nodes.length || 0;
        const shown = nodes.slice(0, max);
        const message = `+${amount - max}`;
        shown.push(React.createElement(Avatar, null, message));
        return shown;
    }, [children, max]);
    return (React.createElement(Root, Object.assign({}, props, { ref: ref }), _children));
});
List.displayName = 'Avatar.List';

export { List };
