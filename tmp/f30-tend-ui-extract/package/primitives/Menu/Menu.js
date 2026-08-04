import { __rest } from 'tslib';
import React from 'react';
import { ChevronDown } from '@10d/tend-ui-icons/ChevronDown';
import { ChevronUp } from '@10d/tend-ui-icons/ChevronUp';
import { useTheme } from '@10d/tend-ui-theme';
import { Box } from '@10d/tend-ui-grid';
import { Badge } from '../Badge/Badge.js';
import { Root } from './styled.js';

const Label = ({ after, children, badge, }) => {
    switch (badge === null || badge === void 0 ? void 0 : badge.type) {
        case 'dot': {
            return (React.createElement(Box, { as: 'span', "$display": 'flex', "$alignItems": 'center', "$justifyContent": 'space-between', "$gap": 4 },
                children,
                after,
                React.createElement(Badge, { preset: 'blue' })));
        }
        case 'counter': {
            return (React.createElement(Box, { as: 'span', "$display": 'flex', "$alignItems": 'center', "$justifyContent": 'space-between', "$gap": 4 },
                children,
                after,
                React.createElement(Badge, Object.assign({ preset: 'blue' }, badge))));
        }
        default:
            return (React.createElement(Box, { as: 'span', "$display": 'flex', "$alignItems": 'center', "$justifyContent": 'space-between', "$gap": 4 },
                children,
                after));
    }
};
const traverse = (menu, openedKeys) => {
    if (!menu)
        return menu;
    if ('type' in menu)
        return menu;
    if ('children' in menu) {
        const { badge } = menu;
        const isOpened = openedKeys.includes(menu.key);
        const after = isOpened ? React.createElement(ChevronUp, null) : React.createElement(ChevronDown, null);
        return Object.assign(Object.assign({}, menu), { label: (React.createElement(Label, { after: after, badge: badge }, menu.label)), children: menu.children.map(menu => traverse(menu, openedKeys)) });
    }
    const { badge } = menu;
    return Object.assign(Object.assign({}, menu), { label: React.createElement(Label, { badge: badge }, menu.label) });
};
const useMenus = (menus, openedKeys) => {
    return React.useMemo(() => menus.map(menu => traverse(menu, openedKeys)), [menus, openedKeys]);
};
/**
 * @internal Не для публичного использования
 */
const Menu = React.forwardRef((_a, ref) => {
    var { items = [], trigger = 'click' } = _a, props = __rest(_a, ["items", "trigger"]);
    const theme = useTheme();
    const [openedKeys, setOpenedKeys] = React.useState([]);
    const menus = useMenus(items, openedKeys);
    const overflowedIndicator = React.useMemo(() => {
        const isOpened = openedKeys.includes('rc-menu-more');
        return (React.createElement(Box, { as: 'span', "$display": 'flex', "$alignItems": 'center', "$gap": 4 },
            "\u0415\u0449\u0435",
            isOpened ? React.createElement(ChevronUp, null) : React.createElement(ChevronDown, null)));
    }, [openedKeys]);
    const handleOpenChange = React.useCallback((path) => {
        setOpenedKeys(path);
    }, []);
    return (React.createElement(Root, Object.assign({ overflowedIndicator: overflowedIndicator }, props, { ref: ref, "$theme": theme, items: menus, mode: 'horizontal', expandIcon: null, onOpenChange: handleOpenChange, triggerSubMenuAction: trigger })));
});
Menu.displayName = 'Menu';

export { Menu };
