const isContextMenuItem = (item) => {
    return 'selectable' in item;
};
const isContextMenuDividerItem = (item) => {
    return 'type' in item && item.type === 'divider';
};
const isContextMenuGroupItem = (item) => {
    return 'type' in item && item.type === 'group';
};
const isContextSubMenuItem = (item) => {
    return !isContextMenuDividerItem(item) && !isContextMenuGroupItem(item);
};

export { isContextMenuDividerItem, isContextMenuGroupItem, isContextMenuItem, isContextSubMenuItem };
