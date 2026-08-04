import React from 'react';
import { Button, Input } from '@10d/tend-ui-primitives';
import { v4 } from 'uuid';
import { Bookmark } from '@10d/tend-ui-icons/Bookmark';
import { useBoolean, INTERNAL_useMissingName } from '@10d/tend-ui-hooks';
import { Form } from '../../../Form/Form.js';
import { Modal } from '../../../../primitives/Modal/Modal.js';
import { useColumnsSettingsPresetsProvider } from '../../contexts/PresetsContext.js';
import { mapColumnsForPreset } from '../../utils/mapColumnsForPreset.js';

const SavePresetButton = ({ columns, }) => {
    var _a;
    const [form] = Form.useForm();
    const model = useColumnsSettingsPresetsProvider('ColumnsSettings.SavePresetButton');
    const [open, toggle] = useBoolean(false);
    const names = ((_a = model.presets) === null || _a === void 0 ? void 0 : _a.map(preset => preset.label)) || [];
    const name = INTERNAL_useMissingName(names, 'Сохраненные колонки');
    return (React.createElement(React.Fragment, null,
        React.createElement(Button, { before: React.createElement(Bookmark, null), "data-testid": 'tend-ui-columns-settings-save-button', variant: 'secondary', size: 'small', onClick: () => {
                toggle();
            } }),
        React.createElement(Modal, { "data-testid": 'tend-ui-columns-settings-save-preset-modal', open: open, size: 'small', title: '\u0423\u043A\u0430\u0436\u0438\u0442\u0435 \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0448\u0430\u0431\u043B\u043E\u043D\u0430 \u043A\u043E\u043B\u043E\u043D\u043E\u043A', cancelButtonProps: { variant: 'link' }, okText: '\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C \u043A\u043E\u043B\u043E\u043D\u043A\u0438', onOk: React.useCallback(() => {
                form.validateFields().then(payload => {
                    var _a;
                    if (!payload.name)
                        return;
                    const value = mapColumnsForPreset(columns);
                    (_a = model.onPresetSave) === null || _a === void 0 ? void 0 : _a.call(model, {
                        id: v4(),
                        label: payload.name,
                        value,
                    });
                    toggle();
                    form.resetFields();
                });
            }, [columns, form, model, toggle]), onCancel: () => toggle() },
            React.createElement(Form, { form: form, initialValues: { name } },
                React.createElement(Form.Item, { required: true, name: 'name', rules: React.useMemo(() => [
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
                    React.createElement(Input, { placeholder: '\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0444\u0438\u043B\u044C\u0442\u0440\u0430' }))))));
};
SavePresetButton.displayName = 'ColumnsSettings.SavePresetButton';

export { SavePresetButton };
