'use strict';

var React = require('react');
var core = require('@dnd-kit/core');
var PresetsContext = require('../../contexts/PresetsContext.js');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

const Root = ({ columns, children, onColumnDragEnd, defaultPresets = [], onPresetApply, onPresetEdit, onPresetRemove, onPresetSave, }) => {
    const handleDragEnd = React__default["default"].useCallback((e) => {
        if (!e.over)
            return;
        if (e.active.id === e.over.id)
            return;
        const ids = columns.map(column => column.id);
        const from = ids.indexOf(e.active.id.toString());
        const to = ids.indexOf(e.over.id.toString());
        onColumnDragEnd === null || onColumnDragEnd === void 0 ? void 0 : onColumnDragEnd(from, to);
    }, [columns, onColumnDragEnd]);
    return (React__default["default"].createElement(core.DndContext, { "data-testid": 'tend-ui-columns-settings-root', onDragEnd: handleDragEnd },
        React__default["default"].createElement(PresetsContext.ColumnsSettingsPresetsProvider, { presets: defaultPresets, onPresetApply: onPresetApply, onPresetEdit: onPresetEdit, onPresetRemove: onPresetRemove, onPresetSave: onPresetSave }, children)));
};
Root.displayName = 'ColumnsSettings.Root';

exports.Root = Root;
