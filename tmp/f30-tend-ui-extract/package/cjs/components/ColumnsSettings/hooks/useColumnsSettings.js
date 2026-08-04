'use strict';

var React = require('react');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

const useColumnsSettings = (model) => {
    const onColumnVisibilityChange = React__default["default"].useCallback((visible, column) => {
        model.display(visible, column);
    }, [model]);
    const onColumnPinningChange = React__default["default"].useCallback((position, column) => {
        model.pin(position, column);
    }, [model]);
    const onColumnsReset = React__default["default"].useCallback(() => {
        model.reset();
    }, [model]);
    const onColumnDragEnd = React__default["default"].useCallback((from, to) => {
        model.swap(from, to);
    }, [model]);
    const properties = React__default["default"].useMemo(() => ({
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

exports.useColumnsSettings = useColumnsSettings;
