import React from 'react';
import mapValues from 'lodash/mapValues';
import { isUndefined } from '@10d/tend-ui-utils/isUndefined';
import { useCallbackRef, useDebouncedCallback, useControllableState } from '@10d/tend-ui-hooks';
import { useDependsGraph } from '../../hooks/useDependsGraph.js';
import { FiltersContext } from '../../contexts/FiltersContext.js';
import { useFiltersForm } from '../../core/useFiltersForm.js';
import { FiltersFormProvider } from '../../core/FiltersFormProvider.js';
import { FiltersPresetsProvider } from '../../contexts/FiltersPresetsContext.js';
import { extract, pack } from '../../utils.js';

const Root = ({ value, debounce, name, form, filters, children, onFilterValuesChange, onFilterReset, onFiltersReset, INTERNAL_scope, defaultPresets, presets, onPresetsChange, onPresetSave, onPresetEdit, onPresetRemove, }) => {
    const model = useFiltersForm(form, INTERNAL_scope);
    const dependencies = useDependsGraph(filters);
    const onValuesChange = useCallbackRef((changed, values) => {
        const patched = mapValues(extract(values, INTERNAL_scope), (v, k) => {
            if (!dependencies[k])
                return v;
            const [touched] = Object.keys(extract(changed, INTERNAL_scope));
            if (dependencies[k].includes(touched)) {
                model.set(k, undefined);
                return undefined;
            }
            return v;
        });
        onFilterValuesChange === null || onFilterValuesChange === void 0 ? void 0 : onFilterValuesChange(changed, pack(patched, INTERNAL_scope));
    });
    const _onFilterValuesChange = useDebouncedCallback(onValuesChange, debounce);
    const [_presets = [], _setPresets] = useControllableState({
        defaultValue: defaultPresets,
        value: presets,
        onChange: onPresetsChange,
    });
    const save = useCallbackRef(payload => {
        _setPresets((previousPresets = []) => [...previousPresets, payload]);
    });
    const edit = useCallbackRef(payload => {
        _setPresets((previousPresets = []) => previousPresets.map(previousPreset => previousPreset.id === payload.id ? payload : previousPreset));
    });
    const remove = useCallbackRef(id => {
        _setPresets((previousPresets = []) => previousPresets.filter(previousPreset => previousPreset.id !== id));
    });
    const handlePresetSave = useCallbackRef(preset => {
        save(preset);
        onPresetSave === null || onPresetSave === void 0 ? void 0 : onPresetSave(preset);
    });
    const handlePresetEdit = useCallbackRef(preset => {
        edit(preset);
        onPresetEdit === null || onPresetEdit === void 0 ? void 0 : onPresetEdit(preset);
    });
    const handlePresetRemove = useCallbackRef(preset => {
        remove(preset.id);
        onPresetRemove === null || onPresetRemove === void 0 ? void 0 : onPresetRemove(preset);
    });
    const handlePresetApply = useCallbackRef(preset => {
        model.fill(preset.value);
        const values = model.getState();
        const changed = INTERNAL_scope ? { [INTERNAL_scope]: preset.value } : preset.value;
        _onFilterValuesChange === null || _onFilterValuesChange === void 0 ? void 0 : _onFilterValuesChange(changed, values);
    });
    React.useEffect(() => {
        if (isUndefined(value))
            return;
        model.form.setFieldsValue(value);
    }, [model.form, value]);
    const handleReset = useCallbackRef(() => {
        const values = model.reset();
        _onFilterValuesChange === null || _onFilterValuesChange === void 0 ? void 0 : _onFilterValuesChange(values, values);
        onFiltersReset === null || onFiltersReset === void 0 ? void 0 : onFiltersReset();
    });
    const handleClear = useCallbackRef(name => {
        const [touched, values] = model.clear(name);
        _onFilterValuesChange === null || _onFilterValuesChange === void 0 ? void 0 : _onFilterValuesChange(touched, values);
        onFilterReset === null || onFilterReset === void 0 ? void 0 : onFilterReset(name);
    });
    return (React.createElement(FiltersFormProvider, { getScopedState: model.getScopeState, form: model.form, onReset: handleReset, onClear: handleClear },
        React.createElement(FiltersPresetsProvider, { presets: _presets, onEdit: handlePresetEdit, onRemove: handlePresetRemove, onSave: handlePresetSave, onApply: handlePresetApply },
            React.createElement(FiltersContext, { value: React.useMemo(() => ({
                    name,
                    form: model.form,
                    onFilterValuesChange: _onFilterValuesChange,
                    onFilterReset,
                }), [_onFilterValuesChange, model.form, name, onFilterReset]) }, children))));
};
Root.displayName = 'Filters.Root';

export { Root };
