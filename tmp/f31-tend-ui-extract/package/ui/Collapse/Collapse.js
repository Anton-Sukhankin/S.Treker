import { __rest } from 'tslib';
import React from 'react';
import { isString } from '@10d/tend-ui-utils/isString';
import { Text } from '@10d/tend-ui-typography';
import { Root } from './components/Root/Root.js';
import { Header } from './components/Header/Header.js';
import { Arrow } from './components/Arrow/Arrow.js';
import { Content } from './components/Content/Content.js';
import { Group } from './components/Group/Group.js';

const BaseCollapse = React.forwardRef((_a, ref) => {
    var { open, label, children, onOpenChange, arrowPosition = 'start' } = _a, props = __rest(_a, ["open", "label", "children", "onOpenChange", "arrowPosition"]);
    const showArrowStart = arrowPosition === 'start';
    const showArrowEnd = arrowPosition === 'end';
    return (React.createElement(Root, Object.assign({}, props, { ref: ref, open: open, onOpenChange: onOpenChange }),
        React.createElement(Header, null,
            showArrowStart && React.createElement(Arrow, null),
            isString(label) ? React.createElement(Text, null, label) : label,
            showArrowEnd && React.createElement(Arrow, null)),
        React.createElement(Content, null, children)));
});
const Collapse = Object.assign(BaseCollapse, {
    displayName: 'Collapse',
    Group,
    Root,
    Header,
    Arrow,
    Content,
});

export { Collapse };
