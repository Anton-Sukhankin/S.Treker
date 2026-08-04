'use strict';

var React = require('react');
var Box = require('@10d/tend-ui-grid/Box');
var tendUiTypography = require('@10d/tend-ui-typography');
var tendUiHooks = require('@10d/tend-ui-hooks');
var MoreVert = require('@10d/tend-ui-icons/MoreVert');
var isEqual = require('lodash/isEqual');
var omitBy = require('lodash/omitBy');
var isNil = require('lodash/isNil');
var Dropdown = require('../../../../primitives/Dropdown/Dropdown.js');
var Radio = require('../../../../primitives/Radio/Radio.js');
var Collapse = require('../../../../ui/Collapse/Collapse.js');
var PresetsContext = require('../../contexts/PresetsContext.js');
var mapColumnsForPreset = require('../../utils/mapColumnsForPreset.js');
var Input = require('./Input/Input.js');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);
var isEqual__default = /*#__PURE__*/_interopDefault(isEqual);
var omitBy__default = /*#__PURE__*/_interopDefault(omitBy);
var isNil__default = /*#__PURE__*/_interopDefault(isNil);

const Item = ({ columns, preset, onClick, onRemove, onEdit, }) => {
    const [value, setValue] = React__default["default"].useState(preset.label);
    const [editing, setEditing] = React__default["default"].useState(false);
    const comparing = React__default["default"].useMemo(() => mapColumnsForPreset.mapColumnsForPreset(columns).map(column => omitBy__default["default"](column, isNil__default["default"])), [columns]);
    const checked = React__default["default"].useMemo(() => isEqual__default["default"](comparing, preset.value), [comparing, preset.value]);
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
// TODO: Нужно передавать значение колонок через контекст
// так как PresetList может отдаваться наружу в публичное compound API
const PresetsList = ({ columns, }) => {
    var _a, _b, _c;
    const model = PresetsContext.useColumnsSettingsPresetsProvider('ColumnsSettings.PresetsList');
    const text = ((_a = model.presets) === null || _a === void 0 ? void 0 : _a.length)
        ? `Сохраненные колонки: ${model.presets.length}`
        : 'Сохраненные колонки';
    return (React__default["default"].createElement(Collapse.Collapse, { label: React__default["default"].createElement(Box.Box, { "$display": 'flex', "$alignItems": 'center', "$justifyContent": 'space-between', "$width": '100%', "$minHeight": '20px' },
            React__default["default"].createElement(Box.Box, { "$display": 'flex', "$alignItems": 'center', "$gap": 4 },
                React__default["default"].createElement(tendUiTypography.Text, { strong: true }, text))) }, ((_b = model.presets) === null || _b === void 0 ? void 0 : _b.length) > 0 ? (React__default["default"].createElement(Box.Box, { "$display": 'flex', "$flexDirection": 'column', "$gap": 8 }, (_c = model.presets) === null || _c === void 0 ? void 0 : _c.map(preset => (React__default["default"].createElement(Item, { key: preset.id, columns: columns, preset: preset, onClick: model.onPresetApply, onRemove: model.onPresetRemove, onEdit: model.onPresetEdit }))))) : (React__default["default"].createElement(tendUiTypography.Text, { color: 'gray500' }, "\u041D\u0435\u0442 \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u043D\u044B\u0445 \u043A\u043E\u043B\u043E\u043D\u043E\u043A"))));
};
PresetsList.displayName = 'ColumnsSettings.PresetsList';

exports.PresetsList = PresetsList;
