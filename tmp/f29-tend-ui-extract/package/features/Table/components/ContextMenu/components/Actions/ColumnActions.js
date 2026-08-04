import React from 'react';
import { useTableColumns } from '../../../../hooks/useTableColumns.js';
import { useColumnContext } from '../../contexts/ColumnContext.js';
import { Layout } from './components/Layout/Layout.js';
import { HidingButton } from './components/HidingButton/HidingButton.js';
import { PinningButton } from './components/PinningButton/PinningButton.js';

const ColumnActions = () => {
    const column = useColumnContext();
    const { display, pin } = useTableColumns();
    return (React.createElement(Layout, null,
        React.createElement(PinningButton, { pinned: !!column.fixed, disabled: !column.pinnable, onChange: p => {
                pin(p, column);
                // Force dropdown layout re-aligning after column moving
                setTimeout(() => {
                    window.dispatchEvent(new Event('scroll'));
                }, 0);
            } }),
        React.createElement(HidingButton, { disabled: column.disabled, onClick: () => {
                display(false, column);
            } })));
};
ColumnActions.displayName = 'ContextMenu.ColumnActions';
ColumnActions.Layout = Layout;
ColumnActions.PinningButton = PinningButton;
ColumnActions.HidingButton = HidingButton;

export { ColumnActions };
