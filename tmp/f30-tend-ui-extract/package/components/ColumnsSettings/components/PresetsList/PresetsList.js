import React from 'react';
import { Box } from '@10d/tend-ui-grid/Box';
import { Text } from '@10d/tend-ui-typography';
import { useKeyPress } from '@10d/tend-ui-hooks';
import { MoreVert } from '@10d/tend-ui-icons/MoreVert';
import isEqual from 'lodash/isEqual';
import omitBy from 'lodash/omitBy';
import isNil from 'lodash/isNil';
import { Dropdown } from '../../../../primitives/Dropdown/Dropdown.js';
import { Radio } from '../../../../primitives/Radio/Radio.js';
import { Collapse } from '../../../../ui/Collapse/Collapse.js';
import { useColumnsSettingsPresetsProvider } from '../../contexts/PresetsContext.js';
import { mapColumnsForPreset } from '../../utils/mapColumnsForPreset.js';
import { Input } from './Input/Input.js';

const Item = ({ columns, preset, onClick, onRemove, onEdit, }) => {
    const [value, setValue] = React.useState(preset.label);
    const [editing, setEditing] = React.useState(false);
    const comparing = React.useMemo(() => mapColumnsForPreset(columns).map(column => omitBy(column, isNil)), [columns]);
    const checked = React.useMemo(() => isEqual(comparing, preset.value), [comparing, preset.value]);
    useKeyPress('Enter', () => {
        if (!editing)
            return;
        onEdit === null || onEdit === void 0 ? void 0 : onEdit(Object.assign(Object.assign({}, preset), { label: value }));
        setEditing(false);
        setValue('');
    });
    return (React.createElement(Box, { "$display": 'flex', "$alignItems": 'center', "$gap": 8 },
        React.createElement(Radio, { checked: checked, value: preset.id, onChange: React.useCallback(() => {
                onClick === null || onClick === void 0 ? void 0 : onClick(preset);
            }, [onClick, preset]) }, editing ? (React.createElement(Input, { onChange: e => setValue(e.target.value), value: value })) : (preset.label)),
        React.createElement(Box, { "$display": 'flex', "$justifyContent": 'flex-end', "$flex": '1' },
            React.createElement(Dropdown, { items: React.useMemo(() => [
                    { key: '1', label: 'Переименовать', onClick: () => setEditing(true) },
                    { key: '2', label: 'Удалить', onClick: () => onRemove === null || onRemove === void 0 ? void 0 : onRemove(preset) },
                ], [onRemove, preset]) },
                React.createElement(MoreVert, { cursor: 'pointer', size: 16 })))));
};
// TODO: Нужно передавать значение колонок через контекст
// так как PresetList может отдаваться наружу в публичное compound API
const PresetsList = ({ columns, }) => {
    var _a, _b, _c;
    const model = useColumnsSettingsPresetsProvider('ColumnsSettings.PresetsList');
    const text = ((_a = model.presets) === null || _a === void 0 ? void 0 : _a.length)
        ? `Сохраненные колонки: ${model.presets.length}`
        : 'Сохраненные колонки';
    return (React.createElement(Collapse, { label: React.createElement(Box, { "$display": 'flex', "$alignItems": 'center', "$justifyContent": 'space-between', "$width": '100%', "$minHeight": '20px' },
            React.createElement(Box, { "$display": 'flex', "$alignItems": 'center', "$gap": 4 },
                React.createElement(Text, { strong: true }, text))) }, ((_b = model.presets) === null || _b === void 0 ? void 0 : _b.length) > 0 ? (React.createElement(Box, { "$display": 'flex', "$flexDirection": 'column', "$gap": 8 }, (_c = model.presets) === null || _c === void 0 ? void 0 : _c.map(preset => (React.createElement(Item, { key: preset.id, columns: columns, preset: preset, onClick: model.onPresetApply, onRemove: model.onPresetRemove, onEdit: model.onPresetEdit }))))) : (React.createElement(Text, { color: 'gray500' }, "\u041D\u0435\u0442 \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u043D\u044B\u0445 \u043A\u043E\u043B\u043E\u043D\u043E\u043A"))));
};
PresetsList.displayName = 'ColumnsSettings.PresetsList';

export { PresetsList };
