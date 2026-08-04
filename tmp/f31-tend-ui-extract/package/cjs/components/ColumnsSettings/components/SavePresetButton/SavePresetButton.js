'use strict';

var React = require('react');
var tendUiPrimitives = require('@10d/tend-ui-primitives');
var uuid = require('uuid');
var Bookmark = require('@10d/tend-ui-icons/Bookmark');
var tendUiHooks = require('@10d/tend-ui-hooks');
var Form = require('../../../Form/Form.js');
var Modal = require('../../../../primitives/Modal/Modal.js');
var PresetsContext = require('../../contexts/PresetsContext.js');
var mapColumnsForPreset = require('../../utils/mapColumnsForPreset.js');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

const SavePresetButton = ({ columns, }) => {
    var _a;
    const [form] = Form.Form.useForm();
    const model = PresetsContext.useColumnsSettingsPresetsProvider('ColumnsSettings.SavePresetButton');
    const [open, toggle] = tendUiHooks.useBoolean(false);
    const names = ((_a = model.presets) === null || _a === void 0 ? void 0 : _a.map(preset => preset.label)) || [];
    const name = tendUiHooks.INTERNAL_useMissingName(names, 'Сохраненные колонки');
    return (React__default["default"].createElement(React__default["default"].Fragment, null,
        React__default["default"].createElement(tendUiPrimitives.Button, { before: React__default["default"].createElement(Bookmark.Bookmark, null), "data-testid": 'tend-ui-columns-settings-save-button', variant: 'secondary', size: 'small', onClick: () => {
                toggle();
            } }),
        React__default["default"].createElement(Modal.Modal, { "data-testid": 'tend-ui-columns-settings-save-preset-modal', open: open, size: 'small', title: '\u0423\u043A\u0430\u0436\u0438\u0442\u0435 \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0448\u0430\u0431\u043B\u043E\u043D\u0430 \u043A\u043E\u043B\u043E\u043D\u043E\u043A', cancelButtonProps: { variant: 'link' }, okText: '\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C \u043A\u043E\u043B\u043E\u043D\u043A\u0438', onOk: React__default["default"].useCallback(() => {
                form.validateFields().then(payload => {
                    var _a;
                    if (!payload.name)
                        return;
                    const value = mapColumnsForPreset.mapColumnsForPreset(columns);
                    (_a = model.onPresetSave) === null || _a === void 0 ? void 0 : _a.call(model, {
                        id: uuid.v4(),
                        label: payload.name,
                        value,
                    });
                    toggle();
                    form.resetFields();
                });
            }, [columns, form, model, toggle]), onCancel: () => toggle() },
            React__default["default"].createElement(Form.Form, { form: form, initialValues: { name } },
                React__default["default"].createElement(Form.Form.Item, { required: true, name: 'name', rules: React__default["default"].useMemo(() => [
                        {
                            required: true,
                            message: 'Название шаблона обязательно для заполнения',
                        },
                        {
                            required: true,
                            message: 'Шаблон с таким названием уже существует',
                            validator: () => {
                                var _a;
                                const state = form.getFieldsValue();
                                if (!state.name)
                                    return Promise.resolve();
                                const isExist = (_a = model.presets) === null || _a === void 0 ? void 0 : _a.map(preset => preset.label).includes(state.name);
                                if (!isExist)
                                    return Promise.resolve();
                                return Promise.reject();
                            },
                        },
                    ], [form, model.presets]) },
                    React__default["default"].createElement(tendUiPrimitives.Input, { placeholder: '\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0444\u0438\u043B\u044C\u0442\u0440\u0430' }))))));
};
SavePresetButton.displayName = 'ColumnsSettings.SavePresetButton';

exports.SavePresetButton = SavePresetButton;
