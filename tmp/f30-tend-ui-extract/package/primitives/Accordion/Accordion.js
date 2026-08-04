import { __rest } from 'tslib';
import React from 'react';
import { useTheme } from '@10d/tend-ui-theme';
import { Title, Description, Root, ArrowIcon } from './styled.js';

const Accordion = React.forwardRef((_a, ref) => {
    var { items } = _a, props = __rest(_a, ["items"]);
    const theme = useTheme();
    const itemsProp = items === null || items === void 0 ? void 0 : items.map(item => {
        const { title, description } = item, props = __rest(item, ["title", "description"]);
        if (item.label)
            return item;
        return Object.assign(Object.assign({}, props), { description, label: (React.createElement(React.Fragment, null,
                React.createElement(Title, { theme: theme }, title),
                React.createElement(Description, { theme: theme }, description))) });
    });
    return (React.createElement(Root, Object.assign({ "data-testid": 'tend-ui-accordion' }, props, { "$theme": theme, ref: ref, bordered: true, expandIcon: props => React.createElement(ArrowIcon, { size: 20, "$active": props.isActive }), items: itemsProp, size: 'middle', ghost: false })));
});
Accordion.displayName = 'Accordion';

export { Accordion };
