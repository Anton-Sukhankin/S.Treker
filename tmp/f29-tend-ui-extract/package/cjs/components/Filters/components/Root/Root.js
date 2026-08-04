'use strict';

var React = require('react');
var mapValues = require('lodash/mapValues');
var isUndefined = require('@10d/tend-ui-utils/isUndefined');
var tendUiHooks = require('@10d/tend-ui-hooks');
var useDependsGraph = require('../../hooks/useDependsGraph.js');
var FiltersContext = require('../../contexts/FiltersContext.js');
var useFiltersForm = require('../../core/useFiltersForm.js');
var FiltersFormProvider = require('../../core/FiltersFormProvider.js');
var FiltersPresetsContext = require('../../contexts/FiltersPresetsContext.js');
var utils = require('../../utils.js');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);
var mapValues__default = /*#__PURE__*/_interopDefault(mapValues);

const Root = ({ value, debounce, name, form, filters, children, onFilterValuesChange, onFilterReset, onFiltersReset, INTERNAL_scope, defaultPresets, presets, onPresetsChange, onPresetSave, onPresetEdit, onPresetRemove, }) => {
    const model = useFiltersForm.useFiltersForm(form, INTERNAL_scope);
    const dependencies = useDependsGraph.useDependsGraph(filters);
    const onValuesChange = tendUiHooks.useCallbackRef((changed, values) => {
        const patched = mapValues__default["default"](utils.extract(values, INTERNAL_scope), (v, k) => {
            if (!dependencies[k])
                return v;
            const [touched] = Object.keys(utils.extract(changed, INTERNAL_scope));
            if (dependencies[k].includes(touched)) {
                model.set(k, undefined);
                return undefined;
            }
            return v;
        });
        onFilterValuesChange === null || onFilterValuesChange === void 0 ? void 0 : onFilterValuesChange(changed, utils.pack(patched, INTERNAL_scope));
    });
    const _onFilterValuesChange = tendUiHooks.useDebouncedCallback(onValuesChange, debounce);
    const [_presets = [], _setPresets] = tendUiHooks.useControllableState({
        defaultValue: defaultPresets,
        value: presets,
        onChange: onPresetsChange,
    });
    const save = tendUiHooks.useCallbackRef(payload => {
        _setPresets((previousPresets = []) => [...previousPresets, payload]);
    });
    const edit = tendUiHooks.useCallbackRef(payload => {
        _setPresets((previousPresets = []) => previousPresets.map(previousPreset => previousPreset.id === payload.id ? payload : previousPreset));
    });
    const remove = tendUiHooks.useCallbackRef(id => {
        _setPresets((previousPresets = []) => previousPresets.filter(previousPreset => previousPreset.id !== id));
    });
    const handlePresetSave = tendUiHooks.useCallbackRef(preset => {
        save(preset);
        onPresetSave === null || onPresetSave === void 0 ? void 0 : onPresetSave(preset);
    });
    const handlePresetEdit = tendUiHooks.useCallbackRef(preset => {
        edit(preset);
        onPresetEdit === null || onPresetEdit === void 0 ? void 0 : onPresetEdit(preset);
    });
    const handlePresetRemove = tendUiHooks.useCallbackRef(preset => {
        remove(preset.id);
        onPresetRemove === null || onPresetRemove === void 0 ? void 0 : onPresetRemove(preset);
    });
    const handlePresetApply = tendUiHooks.useCallbackRef(preset => {
        model.fill(preset.value);
        const values = model.getState();
        const changed = INTERNAL_scope ? { [INTERNAL_scope]: preset.value } : preset.value;
        _onFilterValuesChange === null || _onFilterValuesChange === void 0 ? void 0 : _onFilterValuesChange(changed, values);
    });
    React__default["default"].useEffect(() => {
        if (isUndefined.isUndefined(value))
            return;
        model.form.setFieldsValue(value);
    }, [model.form, value]);
    const handleReset = tendUiHooks.useCallbackRef(() => {
        const values = model.reset();
        _onFilterValuesChange === null || _onFilterValuesChange === void 0 ? void 0 : _onFilterValuesChange(values, values);
        onFiltersReset === null || onFiltersReset === void 0 ? void 0 : onFiltersReset();
    });
    const handleClear = tendUiHooks.useCallbackRef(name => {
        const [touched, values] = model.clear(name);
        _onFilterValuesChange === null || _onFilterValuesChange === void 0 ? void 0 : _onFilterValuesChange(touched, values);
        onFilterReset === null || onFilterReset === void 0 ? void 0 : onFilterReset(name);
    });
    return (React__default["default"].createElement(FiltersFormProvider.FiltersFormProvider, { getScopedState: model.getScopeState, form: model.form, onReset: handleReset, onClear: handleClear },
        React__default["default"].createElement(FiltersPresetsContext.FiltersPresetsProvider, { presets: _presets, onEdit: handlePresetEdit, onRemove: handlePresetRemove, onSave: handlePresetSave, onApply: handlePresetApply },
            React__default["default"].createElement(FiltersContext.FiltersContext, { value: React__default["default"].useMemo(() => ({
                    name,
                    form: model.form,
                    onFilterValuesChange: _onFilterValuesChange,
                    onFilterReset,
                }), [_onFilterValuesChange, model.form, name, onFilterReset]) }, children))));
};
Root.displayName = 'Filters.Root';

exports.Root = Root;
