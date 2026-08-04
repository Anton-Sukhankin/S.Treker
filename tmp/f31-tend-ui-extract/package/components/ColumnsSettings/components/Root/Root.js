import React from 'react';
import { DndContext } from '@dnd-kit/core';
import { ColumnsSettingsPresetsProvider } from '../../contexts/PresetsContext.js';

const Root = ({ columns, children, onColumnDragEnd, defaultPresets = [], onPresetApply, onPresetEdit, onPresetRemove, onPresetSave, }) => {
    const handleDragEnd = React.useCallback((e) => {
        if (!e.over)
            return;
        if (e.active.id === e.over.id)
            return;
        const ids = columns.map(column => column.id);
        const from = ids.indexOf(e.active.id.toString());
        const to = ids.indexOf(e.over.id.toString());
        onColumnDragEnd === null || onColumnDragEnd === void 0 ? void 0 : onColumnDragEnd(from, to);
    }, [columns, onColumnDragEnd]);
    return (React.createElement(DndContext, { "data-testid": 'tend-ui-columns-settings-root', onDragEnd: handleDragEnd },
        React.createElement(ColumnsSettingsPresetsProvider, { presets: defaultPresets, onPresetApply: onPresetApply, onPresetEdit: onPresetEdit, onPresetRemove: onPresetRemove, onPresetSave: onPresetSave }, children)));
};
Root.displayName = 'ColumnsSettings.Root';

export { Root };
