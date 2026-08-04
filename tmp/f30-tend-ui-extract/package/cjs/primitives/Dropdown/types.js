'use strict';

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

exports.isContextMenuDividerItem = isContextMenuDividerItem;
exports.isContextMenuGroupItem = isContextMenuGroupItem;
exports.isContextMenuItem = isContextMenuItem;
exports.isContextSubMenuItem = isContextSubMenuItem;
