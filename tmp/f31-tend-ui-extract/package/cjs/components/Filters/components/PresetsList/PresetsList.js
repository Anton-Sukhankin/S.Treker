'use strict';

var React = require('react');
var Box = require('@10d/tend-ui-grid/Box');
var tendUiTypography = require('@10d/tend-ui-typography');
var tendUiHooks = require('@10d/tend-ui-hooks');
var MoreVert = require('@10d/tend-ui-icons/MoreVert');
var isEqual = require('lodash/isEqual');
var pickBy = require('lodash/pickBy');
var identity = require('lodash/identity');
var FiltersContext = require('../../contexts/FiltersContext.js');
var FiltersPresetsContext = require('../../contexts/FiltersPresetsContext.js');
var Radio = require('../../../../primitives/Radio/Radio.js');
var Dropdown = require('../../../../primitives/Dropdown/Dropdown.js');
var Collapse = require('../../../../ui/Collapse/Collapse.js');
var Input = require('./Input/Input.js');
var useValuesObserver = require('../../hooks/useValuesObserver.js');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);
var isEqual__default = /*#__PURE__*/_interopDefault(isEqual);
var pickBy__default = /*#__PURE__*/_interopDefault(pickBy);
var identity__default = /*#__PURE__*/_interopDefault(identity);

const Item = ({ preset, onClick, onRemove, onEdit, INTERNAL_scope }) => {
    const ctx = FiltersContext.useFiltersContext('Item');
    const values = useValuesObserver.useValuesObserver('PresetsList.Item', ctx.form, INTERNAL_scope);
    const [value, setValue] = React__default["default"].useState(preset.label);
    const [editing, setEditing] = React__default["default"].useState(false);
    const checked = React__default["default"].useMemo(() => isEqual__default["default"](pickBy__default["default"](values, identity__default["default"]), preset.value), [preset.value, values]);
    tendUiHooks.useKeyPress('Enter', () => {
        if (!editing)
            return;
        onEdit === null || onEdit === void 0 ? void 0 : onEdit(Object.assign(Object.assign({}, preset), { label: value }));
        setEditing(false);
        setValue('');
    });
    return (React__default["default"].createElement(Box.Box, { "$display": 'flex', "$alignItems": 'center', "$gap": 8 },
        React__default["default"].createElement(Radio.Radio, { checked: checked, value: preset.id, onChange: React__default["default"].useCallback(() => {
                onClick === null || onClick === void 0 ? void 0 : onClick(preset);
            }, [onClick, preset]) }, editing ? (React__default["default"].createElement(Input.Input, { onChange: e => setValue(e.target.value), value: value })) : (preset.label)),
        React__default["default"].createElement(Box.Box, { "$display": 'flex', "$justifyContent": 'flex-end', "$flex": '1' },
            React__default["default"].createElement(Dropdown.Dropdown, { items: React__default["default"].useMemo(() => [
                    { key: '1', label: 'Переименовать', onClick: () => setEditing(true) },
                    { key: '2', label: 'Удалить', onClick: () => onRemove === null || onRemove === void 0 ? void 0 : onRemove(preset) },
                ], [onRemove, preset]) },
                React__default["default"].createElement(MoreVert.MoreVert, { cursor: 'pointer', size: 16 })))));
};
const PresetsList = ({ INTERNAL_scope }) => {
    const model = FiltersPresetsContext.useFiltersPresetsProvider('Filters.PresetsList');
    const text = model.presets.length
        ? `Сохраненные фильтры: ${model.presets.length}`
        : 'Сохраненные фильтры';
    return (React__default["default"].createElement(Collapse.Collapse, { label: React__default["default"].createElement(Box.Box, { "$display": 'flex', "$alignItems": 'center', "$justifyContent": 'space-between', "$width": '100%', "$minHeight": '20px' },
            React__default["default"].createElement(Box.Box, { "$display": 'flex', "$alignItems": 'center', "$gap": 4 },
                React__default["default"].createElement(tendUiTypography.Text, { strong: true }, text))) }, model.presets.length > 0 ? (React__default["default"].createElement(Box.Box, { "$display": 'flex', "$flexDirection": 'column', "$gap": 8 }, model.presets.map(preset => (React__default["default"].createElement(Item, { key: preset.id, preset: preset, onClick: model.onApply, onRemove: model.onRemove, onEdit: model.onEdit, INTERNAL_scope: INTERNAL_scope }))))) : (React__default["default"].createElement(tendUiTypography.Text, { color: 'gray500' }, "\u041D\u0435\u0442 \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u043D\u044B\u0445 \u0444\u0438\u043B\u044C\u0442\u0440\u043E\u0432"))));
};

exports.PresetsList = PresetsList;
