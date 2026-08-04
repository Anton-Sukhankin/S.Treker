import { __rest } from 'tslib';
import React from 'react';
import { useTheme } from '@10d/tend-ui-theme';
import { Text } from '@10d/tend-ui-typography';
import { Box } from '@10d/tend-ui-grid';
import { Root } from './styled.js';
import { Item } from './Item/Item.js';
import { ListContext } from './context/index.js';

const BaseList = (_a, ref) => {
    var { gap, className, maxHeight, scrollable = false, onItemClick, header } = _a, props = __rest(_a, ["gap", "className", "maxHeight", "scrollable", "onItemClick", "header"]);
    const theme = useTheme();
    const handleItemClick = React.useCallback((value) => {
        onItemClick === null || onItemClick === void 0 ? void 0 : onItemClick(value);
    }, [onItemClick]);
    const root = (React.createElement(Root, Object.assign({}, props, { ref: ref, "$theme": theme, "$scrollable": scrollable, "$maxHeight": maxHeight, "$gap": gap, className: ['tend-ui-list', className].filter(Boolean).join(' ') })));
    return (React.createElement(ListContext.Provider, { value: React.useMemo(() => ({ onItemClick: handleItemClick }), [handleItemClick]) }, header ? (React.createElement(Box, { "$display": 'flex', "$flexDirection": 'column', "$gap": 8 },
        React.createElement(Text, { color: 'gray650', size: 'small' }, header),
        root)) : (root)));
};
const ForwardedList = React.forwardRef(BaseList);
const List = Object.assign(ForwardedList, {
    displayName: 'List',
    Item,
});

export { List };
