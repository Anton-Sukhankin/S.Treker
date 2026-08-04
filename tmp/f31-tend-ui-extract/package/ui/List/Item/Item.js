import { __rest } from 'tslib';
import React from 'react';
import { useTheme } from '@10d/tend-ui-theme';
import { Box } from '@10d/tend-ui-grid';
import { Root } from './styled.js';
import { useListContext } from '../context/index.js';

const Item = React.forwardRef((_a, ref) => {
    var { children, before, after, disabled = false, className, onClick, value } = _a, props = __rest(_a, ["children", "before", "after", "disabled", "className", "onClick", "value"]);
    const theme = useTheme();
    const context = useListContext();
    const handleClick = React.useCallback((e) => {
        var _a;
        if (disabled)
            return;
        onClick === null || onClick === void 0 ? void 0 : onClick(e, value);
        (_a = context === null || context === void 0 ? void 0 : context.onItemClick) === null || _a === void 0 ? void 0 : _a.call(context, value);
    }, [disabled, onClick, value, context === null || context === void 0 ? void 0 : context.onItemClick]);
    return (React.createElement(Root, Object.assign({}, props, { ref: ref, theme: theme, "$disabled": disabled, className: ['tend-ui-list-item', className].filter(Boolean).join(' '), value: value, onClick: handleClick }),
        before,
        React.createElement(Box, { as: 'span', "$width": '100%' }, children),
        after));
});
Item.displayName = 'List.Item';

export { Item };
