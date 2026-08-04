import React from 'react';
import { Toggle } from './styled.js';
import { Root } from './components/Root/Root.js';
import { DragHandle } from './components/DragHandle/DragHandle.js';
import { Pin } from './components/Pin/Pin.js';

const BaseColumnsSetting = ({ column, onColumnVisibilityChange, onColumnPinningChange, }) => {
    return (React.createElement(Root, { column: column },
        React.createElement(Toggle, { "data-testid": 'tend-ui-columns-settings-column-setting-toggle', checked: column.visible, disabled: column.disabled, UNSTABLE_styling: React.useMemo(() => ({ Text: { strong: true } }), []), onChange: React.useCallback(visible => {
                onColumnVisibilityChange === null || onColumnVisibilityChange === void 0 ? void 0 : onColumnVisibilityChange(visible, column);
            }, [column, onColumnVisibilityChange]) }, column.label || column.title),
        React.createElement(Pin, { disabled: !column.pinnable, pinned: !!column.fixed, onChange: React.useCallback(p => onColumnPinningChange === null || onColumnPinningChange === void 0 ? void 0 : onColumnPinningChange(p, column), [column, onColumnPinningChange]) }),
        React.createElement(DragHandle, { disabled: !column.draggable })));
};
const MemoizedColumnsSetting = React.memo(BaseColumnsSetting);
const ColumnsSetting = Object.assign(MemoizedColumnsSetting, {
    Root,
    DragHandle,
    Pin,
});

export { ColumnsSetting };
