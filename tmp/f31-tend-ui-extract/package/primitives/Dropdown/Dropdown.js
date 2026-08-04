import { __rest } from 'tslib';
import React from 'react';
import { isString } from '@10d/tend-ui-utils/isString';
import { ChevronRight } from '@10d/tend-ui-icons/ChevronRight';
import { useControllableState } from '@10d/tend-ui-hooks';
import { Done } from '@10d/tend-ui-icons/Done';
import { Root, Content as Content$1 } from './styled.js';
import { isContextMenuItem } from './types.js';

const flatten = (items) => {
    return items.flatMap(item => {
        if ('children' in item)
            return [item, ...flatten(item.children || [])];
        return item;
    });
};
const Content = ({ children, width, padding = '16px', display, flexDirection }) => (React.createElement(Content$1, { className: 'tend-ui-dropdown-content', "$display": display, "$flexDirection": flexDirection, "$padding": padding, "$width": width }, children));
const BaseDropdown = React.forwardRef((_a, ref) => {
    var { mode = 'single', children, content, dropdownRender, menu, selectedKeys, defaultSelectedKeys, onSelect, items, onClick } = _a, props = __rest(_a, ["mode", "children", "content", "dropdownRender", "menu", "selectedKeys", "defaultSelectedKeys", "onSelect", "items", "onClick"]);
    const state = React.useMemo(() => flatten(items || []).reduce((result, cv) => {
        if (!isContextMenuItem(cv))
            return result;
        result[cv.key] = !!cv.selectable;
        return result;
    }, {}), [items]);
    const [_selectedKeys, setSelectedKeys] = useControllableState({
        defaultValue: defaultSelectedKeys,
        value: selectedKeys,
        onChange: onSelect,
    });
    const child = isString(children) ? React.createElement("span", null, children) : children;
    const _dropdownRender = React.useCallback((node) => {
        if (dropdownRender)
            return dropdownRender(node);
        if (content)
            return React.createElement(Content, null, content);
        return node;
    }, [content, dropdownRender]);
    const isSelected = React.useCallback((key) => _selectedKeys === null || _selectedKeys === void 0 ? void 0 : _selectedKeys.includes(key), [_selectedKeys]);
    const handleClick = React.useCallback(info => {
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
    const _items = React.useMemo(() => {
        function traverse(item) {
            var _a;
            if (isContextMenuItem(item)) {
                return Object.assign(Object.assign({}, item), { itemIcon: isSelected(item.key) ? (React.createElement(Done, { style: { marginLeft: '8px' }, size: 16, color: 'blue600' })) : null });
            }
            if ('children' in item) {
                return Object.assign(Object.assign({}, item), { children: (_a = item.children) === null || _a === void 0 ? void 0 : _a.map(traverse) });
            }
            return item;
        }
        return items === null || items === void 0 ? void 0 : items.map(traverse);
    }, [isSelected, items]);
    const _menu = React.useMemo(() => (Object.assign({ expandIcon: React.createElement(ChevronRight, null), items: _items, onClick: handleClick }, menu)), [_items, handleClick, menu]);
    return (React.createElement(Root, Object.assign({}, props, { ref: ref, dropdownRender: _dropdownRender, menu: _menu }), child));
});
/**
 * TODO: Должен быть ContextMenu компонент
 */
const Dropdown = Object.assign(BaseDropdown, {
    displayName: 'Dropdown',
    Content,
});

export { Dropdown };
