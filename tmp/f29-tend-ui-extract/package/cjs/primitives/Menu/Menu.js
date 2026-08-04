'use strict';

var tslib = require('tslib');
var React = require('react');
var ChevronDown = require('@10d/tend-ui-icons/ChevronDown');
var ChevronUp = require('@10d/tend-ui-icons/ChevronUp');
var tendUiTheme = require('@10d/tend-ui-theme');
var tendUiGrid = require('@10d/tend-ui-grid');
var Badge = require('../Badge/Badge.js');
var styled = require('./styled.js');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

const Label = ({ after, children, badge, }) => {
    switch (badge === null || badge === void 0 ? void 0 : badge.type) {
        case 'dot': {
            return (React__default["default"].createElement(tendUiGrid.Box, { as: 'span', "$display": 'flex', "$alignItems": 'center', "$justifyContent": 'space-between', "$gap": 4 },
                children,
                after,
                React__default["default"].createElement(Badge.Badge, { preset: 'blue' })));
        }
        case 'counter': {
            return (React__default["default"].createElement(tendUiGrid.Box, { as: 'span', "$display": 'flex', "$alignItems": 'center', "$justifyContent": 'space-between', "$gap": 4 },
                children,
                after,
                React__default["default"].createElement(Badge.Badge, Object.assign({ preset: 'blue' }, badge))));
        }
        default:
            return (React__default["default"].createElement(tendUiGrid.Box, { as: 'span', "$display": 'flex', "$alignItems": 'center', "$justifyContent": 'space-between', "$gap": 4 },
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
        const after = isOpened ? React__default["default"].createElement(ChevronUp.ChevronUp, null) : React__default["default"].createElement(ChevronDown.ChevronDown, null);
        return Object.assign(Object.assign({}, menu), { label: (React__default["default"].createElement(Label, { after: after, badge: badge }, menu.label)), children: menu.children.map(menu => traverse(menu, openedKeys)) });
    }
    const { badge } = menu;
    return Object.assign(Object.assign({}, menu), { label: React__default["default"].createElement(Label, { badge: badge }, menu.label) });
};
const useMenus = (menus, openedKeys) => {
    return React__default["default"].useMemo(() => menus.map(menu => traverse(menu, openedKeys)), [menus, openedKeys]);
};
/**
 * @internal Не для публичного использования
 */
const Menu = React__default["default"].forwardRef((_a, ref) => {
    var { items = [], trigger = 'click' } = _a, props = tslib.__rest(_a, ["items", "trigger"]);
    const theme = tendUiTheme.useTheme();
    const [openedKeys, setOpenedKeys] = React__default["default"].useState([]);
    const menus = useMenus(items, openedKeys);
    const overflowedIndicator = React__default["default"].useMemo(() => {
        const isOpened = openedKeys.includes('rc-menu-more');
        return (React__default["default"].createElement(tendUiGrid.Box, { as: 'span', "$display": 'flex', "$alignItems": 'center', "$gap": 4 },
            "\u0415\u0449\u0435",
            isOpened ? React__default["default"].createElement(ChevronUp.ChevronUp, null) : React__default["default"].createElement(ChevronDown.ChevronDown, null)));
    }, [openedKeys]);
    const handleOpenChange = React__default["default"].useCallback((path) => {
        setOpenedKeys(path);
    }, []);
    return (React__default["default"].createElement(styled.Root, Object.assign({ overflowedIndicator: overflowedIndicator }, props, { ref: ref, "$theme": theme, items: menus, mode: 'horizontal', expandIcon: null, onOpenChange: handleOpenChange, triggerSubMenuAction: trigger })));
});
Menu.displayName = 'Menu';

exports.Menu = Menu;
