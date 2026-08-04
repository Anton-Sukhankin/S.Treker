import React from 'react';

const useColumnsSettings = (model) => {
    const onColumnVisibilityChange = React.useCallback((visible, column) => {
        model.display(visible, column);
    }, [model]);
    const onColumnPinningChange = React.useCallback((position, column) => {
        model.pin(position, column);
    }, [model]);
    const onColumnsReset = React.useCallback(() => {
        model.reset();
    }, [model]);
    const onColumnDragEnd = React.useCallback((from, to) => {
        model.swap(from, to);
    }, [model]);
    const properties = React.useMemo(() => ({
        columns: model.columns,
        onColumnVisibilityChange,
        onColumnPinningChange,
        onColumnDragEnd,
        onColumnsReset,
        defaultPresets: model.presets,
        onPresetApply: model.applyPreset,
        onPresetSave: model.savePreset,
        onPresetEdit: model.editPreset,
        onPresetRemove: removed => model.removePreset(removed.id),
    }), [
        model,
        onColumnDragEnd,
        onColumnPinningChange,
        onColumnVisibilityChange,
        onColumnsReset,
    ]);
    return properties;
};

export { useColumnsSettings };
