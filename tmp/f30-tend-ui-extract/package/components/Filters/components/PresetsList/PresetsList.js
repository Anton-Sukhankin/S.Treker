import React from 'react';
import { Box } from '@10d/tend-ui-grid/Box';
import { Text } from '@10d/tend-ui-typography';
import { useKeyPress } from '@10d/tend-ui-hooks';
import { MoreVert } from '@10d/tend-ui-icons/MoreVert';
import isEqual from 'lodash/isEqual';
import pickBy from 'lodash/pickBy';
import identity from 'lodash/identity';
import { useFiltersContext } from '../../contexts/FiltersContext.js';
import { useFiltersPresetsProvider } from '../../contexts/FiltersPresetsContext.js';
import { Radio } from '../../../../primitives/Radio/Radio.js';
import { Dropdown } from '../../../../primitives/Dropdown/Dropdown.js';
import { Collapse } from '../../../../ui/Collapse/Collapse.js';
import { Input } from './Input/Input.js';
import { useValuesObserver } from '../../hooks/useValuesObserver.js';

const Item = ({ preset, onClick, onRemove, onEdit, INTERNAL_scope }) => {
    const ctx = useFiltersContext('Item');
    const values = useValuesObserver('PresetsList.Item', ctx.form, INTERNAL_scope);
    const [value, setValue] = React.useState(preset.label);
    const [editing, setEditing] = React.useState(false);
    const checked = React.useMemo(() => isEqual(pickBy(values, identity), preset.value), [preset.value, values]);
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
const PresetsList = ({ INTERNAL_scope }) => {
    const model = useFiltersPresetsProvider('Filters.PresetsList');
    const text = model.presets.length
        ? `Сохраненные фильтры: ${model.presets.length}`
        : 'Сохраненные фильтры';
    return (React.createElement(Collapse, { label: React.createElement(Box, { "$display": 'flex', "$alignItems": 'center', "$justifyContent": 'space-between', "$width": '100%', "$minHeight": '20px' },
            React.createElement(Box, { "$display": 'flex', "$alignItems": 'center', "$gap": 4 },
                React.createElement(Text, { strong: true }, text))) }, model.presets.length > 0 ? (React.createElement(Box, { "$display": 'flex', "$flexDirection": 'column', "$gap": 8 }, model.presets.map(preset => (React.createElement(Item, { key: preset.id, preset: preset, onClick: model.onApply, onRemove: model.onRemove, onEdit: model.onEdit, INTERNAL_scope: INTERNAL_scope }))))) : (React.createElement(Text, { color: 'gray500' }, "\u041D\u0435\u0442 \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u043D\u044B\u0445 \u0444\u0438\u043B\u044C\u0442\u0440\u043E\u0432"))));
};

export { PresetsList };
