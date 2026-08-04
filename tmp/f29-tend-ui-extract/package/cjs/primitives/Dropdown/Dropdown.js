'use strict';

var tslib = require('tslib');
var React = require('react');
var isString = require('@10d/tend-ui-utils/isString');
var ChevronRight = require('@10d/tend-ui-icons/ChevronRight');
var tendUiHooks = require('@10d/tend-ui-hooks');
var Done = require('@10d/tend-ui-icons/Done');
var styled = require('./styled.js');
var types = require('./types.js');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

const flatten = (items) => {
    return items.flatMap(item => {
        if ('children' in item)
            return [item, ...flatten(item.children || [])];
        return item;
    });
};
const Content = ({ children, width, padding = '16px', display, flexDirection }) => (React__default["default"].createElement(styled.Content, { className: 'tend-ui-dropdown-content', "$display": display, "$flexDirection": flexDirection, "$padding": padding, "$width": width }, children));
const BaseDropdown = React__default["default"].forwardRef((_a, ref) => {
    var { mode = 'single', children, content, dropdownRender, menu, selectedKeys, defaultSelectedKeys, onSelect, items, onClick } = _a, props = tslib.__rest(_a, ["mode", "children", "content", "dropdownRender", "menu", "selectedKeys", "defaultSelectedKeys", "onSelect", "items", "onClick"]);
    const state = React__default["default"].useMemo(() => flatten(items || []).reduce((result, cv) => {
        if (!types.isContextMenuItem(cv))
            return result;
        result[cv.key] = !!cv.selectable;
        return result;
    }, {}), [items]);
    const [_selectedKeys, setSelectedKeys] = tendUiHooks.useControllableState({
        defaultValue: defaultSelectedKeys,
        value: selectedKeys,
        onChange: onSelect,
    });
    const child = isString.isString(children) ? React__default["default"].createElement("span", null, children) : children;
    const _dropdownRender = React__default["default"].useCallback((node) => {
        if (dropdownRender)
            return dropdownRender(node);
        if (content)
            return React__default["default"].createElement(Content, null, content);
        return node;
    }, [content, dropdownRender]);
    const isSelected = React__default["default"].useCallback((key) => _selectedKeys === null || _selectedKeys === void 0 ? void 0 : _selectedKeys.includes(key), [_selectedKeys]);
    const handleClick = React__default["default"].useCallback(info => {
        onClick === null || onClick === void 0 ? void 0 : onClick(info.keyPath);
        const key = info.key;
        const isSelectable = state[key];
        if (!isSelectable)
            return;
        if (mode === 'single') {
            if (_selectedKeys === null || _selectedKeys === void 0 ? void 0 : _selectedKeys.includes(key)) {
                setSelectedKeys([]);
            }
            else {
                setSelectedKeys([key]);
            }
        }
        else {
            if (_selectedKeys === null || _selectedKeys === void 0 ? void 0 : _selectedKeys.includes(key)) {
                setSelectedKeys(p => p === null || p === void 0 ? void 0 : p.filter(v => v !== key));
            }
            else {
                setSelectedKeys(p => [...(p || []), key]);
            }
        }
    }, [_selectedKeys, mode, onClick, setSelectedKeys, state]);
    const _items = React__default["default"].useMemo(() => {
        function traverse(item) {
            var _a;
            if (types.isContextMenuItem(item)) {
                return Object.assign(Object.assign({}, item), { itemIcon: isSelected(item.key) ? (React__default["default"].createElement(Done.Done, { style: { marginLeft: '8px' }, size: 16, color: 'blue600' })) : null });
            }
            if ('children' in item) {
                return Object.assign(Object.assign({}, item), { children: (_a = item.children) === null || _a === void 0 ? void 0 : _a.map(traverse) });
            }
            return item;
        }
        return items === null || items === void 0 ? void 0 : items.map(traverse);
    }, [isSelected, items]);
    const _menu = React__default["default"].useMemo(() => (Object.assign({ expandIcon: React__default["default"].createElement(ChevronRight.ChevronRight, null), items: _items, onClick: handleClick }, menu)), [_items, handleClick, menu]);
    return (React__default["default"].createElement(styled.Root, Object.assign({}, props, { ref: ref, dropdownRender: _dropdownRender, menu: _menu }), child));
});
/**
 * TODO: Должен быть ContextMenu компонент
 */
const Dropdown = Object.assign(BaseDropdown, {
    displayName: 'Dropdown',
    Content,
});

exports.Dropdown = Dropdown;
