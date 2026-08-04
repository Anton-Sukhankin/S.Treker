import { __rest } from 'tslib';
import React from 'react';
import { useTranslation } from '@10d/tend-ui-locale/hooks/useTranslation';
import { Drawer } from '@10d/tend-ui-primitives';
import { INTERNAL_TendUILogger, isUndefined, isString } from '@10d/tend-ui-utils';
import { Title } from '@10d/tend-ui-typography';
import { Box } from '@10d/tend-ui-grid';
import { Divider } from '../../ui/Divider/Divider.js';
import { ColumnsSetting } from './components/ColumnsSetting/ColumnsSetting.js';
import { ResetButton } from './components/ResetButton/ResetButton.js';
import { List } from './components/List/List.js';
import { Root } from './components/Root/Root.js';
import { SavePresetButton } from './components/SavePresetButton/SavePresetButton.js';
import { PresetsList } from './components/PresetsList/PresetsList.js';

const createReactKey = (config) => {
    var _a;
    return (_a = config.key) !== null && _a !== void 0 ? _a : `tend-ui-filters-list-filter-${config.id}`;
};
const BaseColumnsSettings = (_a) => {
    var { title, columns, onColumnVisibilityChange, onColumnDragEnd, onColumnsReset, onColumnPinningChange, showPresets = false, defaultPresets, onPresetApply, onPresetEdit, onPresetRemove, onPresetSave } = _a, props = __rest(_a, ["title", "columns", "onColumnVisibilityChange", "onColumnDragEnd", "onColumnsReset", "onColumnPinningChange", "showPresets", "defaultPresets", "onPresetApply", "onPresetEdit", "onPresetRemove", "onPresetSave"]);
    if (process.env.NODE_ENV === 'development') {
        INTERNAL_TendUILogger.warning([
            '<ColumnsSettings /> из пакета "@10d/tend-ui" устарел и больше не поддерживается.',
            '',
            'Используйте <DrawerColumnsSettings /> из пакета "@10d/tend-ui-columns-settings".',
            '',
        ]);
    }
    const t = useTranslation();
    const _title = React.useMemo(() => {
        if (isUndefined(title))
            return (React.createElement(Title, { margin: '0', level: 'h5', style: { flex: '1' } }, t(['components', 'ColumnsSettings', 'title'])));
        if (isString(title))
            return (React.createElement(Title, { margin: '0', level: 'h5', style: { flex: '1' } }, title));
        return title;
    }, [t, title]);
    return (React.createElement(Root, { columns: columns, onColumnDragEnd: onColumnDragEnd, defaultPresets: defaultPresets, onPresetApply: onPresetApply, onPresetEdit: onPresetEdit, onPresetRemove: onPresetRemove, onPresetSave: onPresetSave },
        React.createElement(Drawer.Root, Object.assign({ "data-testid": 'tend-ui-columns-settings-drawer' }, props),
            React.createElement(Drawer.Header, null,
                _title,
                React.createElement(Box, { "$display": 'flex', "$alignItems": 'center', "$gap": 8 },
                    showPresets && React.createElement(SavePresetButton, { columns: columns }),
                    React.createElement(ResetButton, { onClick: onColumnsReset }),
                    React.createElement(Drawer.CloseButton, null))),
            React.createElement(Drawer.Body, null,
                React.createElement(List, { columns: columns },
                    showPresets && (React.createElement(React.Fragment, null,
                        React.createElement(PresetsList, { columns: columns }),
                        React.createElement(Divider, { padding: '0' }))),
                    columns.map(column => (React.createElement(ColumnsSetting, { key: createReactKey(column), column: column, onColumnPinningChange: onColumnPinningChange, onColumnVisibilityChange: onColumnVisibilityChange }))))))));
};
const MemoizedBaseColumnsSettings = React.memo(BaseColumnsSettings);
/**
 * @deprecated Компонент устарел и больше не поддерживается.
 * Используйте компонент из пакета `@10d/tend-ui-columns-settings`.
 */
const ColumnsSettings = Object.assign(MemoizedBaseColumnsSettings, {
    displayName: 'ColumnsSettings',
    Root,
    List,
    ColumnsSetting,
    ResetButton,
});

export { ColumnsSettings };
