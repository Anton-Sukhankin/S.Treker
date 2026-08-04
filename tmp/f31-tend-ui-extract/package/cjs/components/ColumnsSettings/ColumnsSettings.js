'use strict';

var tslib = require('tslib');
var React = require('react');
var useTranslation = require('@10d/tend-ui-locale/hooks/useTranslation');
var tendUiPrimitives = require('@10d/tend-ui-primitives');
var tendUiUtils = require('@10d/tend-ui-utils');
var tendUiTypography = require('@10d/tend-ui-typography');
var tendUiGrid = require('@10d/tend-ui-grid');
var Divider = require('../../ui/Divider/Divider.js');
var ColumnsSetting = require('./components/ColumnsSetting/ColumnsSetting.js');
var ResetButton = require('./components/ResetButton/ResetButton.js');
var List = require('./components/List/List.js');
var Root = require('./components/Root/Root.js');
var SavePresetButton = require('./components/SavePresetButton/SavePresetButton.js');
var PresetsList = require('./components/PresetsList/PresetsList.js');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

const createReactKey = (config) => {
    var _a;
    return (_a = config.key) !== null && _a !== void 0 ? _a : `tend-ui-filters-list-filter-${config.id}`;
};
const BaseColumnsSettings = (_a) => {
    var { title, columns, onColumnVisibilityChange, onColumnDragEnd, onColumnsReset, onColumnPinningChange, showPresets = false, defaultPresets, onPresetApply, onPresetEdit, onPresetRemove, onPresetSave } = _a, props = tslib.__rest(_a, ["title", "columns", "onColumnVisibilityChange", "onColumnDragEnd", "onColumnsReset", "onColumnPinningChange", "showPresets", "defaultPresets", "onPresetApply", "onPresetEdit", "onPresetRemove", "onPresetSave"]);
    if (process.env.NODE_ENV === 'development') {
        tendUiUtils.INTERNAL_TendUILogger.warning([
            '<ColumnsSettings /> из пакета "@10d/tend-ui" устарел и больше не поддерживается.',
            '',
            'Используйте <DrawerColumnsSettings /> из пакета "@10d/tend-ui-columns-settings".',
            '',
        ]);
    }
    const t = useTranslation.useTranslation();
    const _title = React__default["default"].useMemo(() => {
        if (tendUiUtils.isUndefined(title))
            return (React__default["default"].createElement(tendUiTypography.Title, { margin: '0', level: 'h5', style: { flex: '1' } }, t(['components', 'ColumnsSettings', 'title'])));
        if (tendUiUtils.isString(title))
            return (React__default["default"].createElement(tendUiTypography.Title, { margin: '0', level: 'h5', style: { flex: '1' } }, title));
        return title;
    }, [t, title]);
    return (React__default["default"].createElement(Root.Root, { columns: columns, onColumnDragEnd: onColumnDragEnd, defaultPresets: defaultPresets, onPresetApply: onPresetApply, onPresetEdit: onPresetEdit, onPresetRemove: onPresetRemove, onPresetSave: onPresetSave },
        React__default["default"].createElement(tendUiPrimitives.Drawer.Root, Object.assign({ "data-testid": 'tend-ui-columns-settings-drawer' }, props),
            React__default["default"].createElement(tendUiPrimitives.Drawer.Header, null,
                _title,
                React__default["default"].createElement(tendUiGrid.Box, { "$display": 'flex', "$alignItems": 'center', "$gap": 8 },
                    showPresets && React__default["default"].createElement(SavePresetButton.SavePresetButton, { columns: columns }),
                    React__default["default"].createElement(ResetButton.ResetButton, { onClick: onColumnsReset }),
                    React__default["default"].createElement(tendUiPrimitives.Drawer.CloseButton, null))),
            React__default["default"].createElement(tendUiPrimitives.Drawer.Body, null,
                React__default["default"].createElement(List.List, { columns: columns },
                    showPresets && (React__default["default"].createElement(React__default["default"].Fragment, null,
                        React__default["default"].createElement(PresetsList.PresetsList, { columns: columns }),
                        React__default["default"].createElement(Divider.Divider, { padding: '0' }))),
                    columns.map(column => (React__default["default"].createElement(ColumnsSetting.ColumnsSetting, { key: createReactKey(column), column: column, onColumnPinningChange: onColumnPinningChange, onColumnVisibilityChange: onColumnVisibilityChange }))))))));
};
const MemoizedBaseColumnsSettings = React__default["default"].memo(BaseColumnsSettings);
/**
 * @deprecated Компонент устарел и больше не поддерживается.
 * Используйте компонент из пакета `@10d/tend-ui-columns-settings`.
 */
const ColumnsSettings = Object.assign(MemoizedBaseColumnsSettings, {
    displayName: 'ColumnsSettings',
    Root: Root.Root,
    List: List.List,
    ColumnsSetting: ColumnsSetting.ColumnsSetting,
    ResetButton: ResetButton.ResetButton,
});

exports.ColumnsSettings = ColumnsSettings;
