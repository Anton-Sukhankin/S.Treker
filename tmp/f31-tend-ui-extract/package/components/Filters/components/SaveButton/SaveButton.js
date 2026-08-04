import React from 'react';
import { Tooltip, Button, Input } from '@10d/tend-ui-primitives';
import { v4 } from 'uuid';
import { Bookmark } from '@10d/tend-ui-icons/Bookmark';
import isEqual from 'lodash/isEqual';
import pickBy from 'lodash/pickBy';
import identity from 'lodash/identity';
import { useBoolean } from '../../../../hooks/useBoolean/useBoolean.js';
import { Form } from '../../../Form/Form.js';
import { Modal } from '../../../../primitives/Modal/Modal.js';
import { useFiltersFormProvider } from '../../core/FiltersFormProvider.js';
import { useFiltersPresetsProvider } from '../../contexts/FiltersPresetsContext.js';
import { useNextFilterName } from './useNextFilterName.js';
import { useValuesObserver } from '../../hooks/useValuesObserver.js';

const SaveButton = ({ INTERNAL_scope }) => {
    const [form] = Form.useForm();
    const { presets } = useFiltersPresetsProvider('Filters.SaveButton');
    const model = useFiltersFormProvider('Filters.SaveButton');
    const fp = useFiltersPresetsProvider('Filters.SaveButton');
    const [open, toggle] = useBoolean(false);
    const values = useValuesObserver('Filters.SaveButton', model.form, INTERNAL_scope);
    const name = useNextFilterName(presets.map(preset => preset.label));
    const isPresetExist = React.useMemo(() => presets.some(preset => isEqual(pickBy(values, identity), preset.value), []), [presets, values]);
    const hasAppliedFilters = React.useMemo(() => Object.values(values || {})
        .filter(Boolean)
        .flat().length > 0, [values]);
    const help = [
        [!hasAppliedFilters, 'Вы не выбрали ни одного фильтра'],
        [isPresetExist, 'Такой набор фильтров уже существует'],
    ];
    const [, title] = help.filter(([condition]) => condition)[0] || [];
    return (React.createElement(React.Fragment, null,
        React.createElement(Tooltip, { title: title },
            React.createElement(Button, { before: React.createElement(Bookmark, null), "data-testid": 'tend-ui-filters-save-button', disabled: !hasAppliedFilters || isPresetExist, variant: 'secondary', size: 'small', onClick: () => {
                    toggle();
                } })),
        React.createElement(Modal, { "data-testid": 'tend-ui-filters-save-preset-modal', open: open, size: 'small', title: '\u0423\u043A\u0430\u0436\u0438\u0442\u0435 \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0444\u0438\u043B\u044C\u0442\u0440\u0430', cancelButtonProps: { variant: 'link' }, okText: '\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C \u0444\u0438\u043B\u044C\u0442\u0440', onOk: React.useCallback(() => {
                form.validateFields().then(payload => {
                    if (!payload.name)
                        return;
                    const value = model.getScopedState();
                    fp.onSave({
                        id: v4(),
                        label: payload.name,
                        value,
                    });
                    toggle();
                    form.resetFields();
                });
            }, [form, model, fp, toggle]), onCancel: () => toggle() },
            React.createElement(Form, { form: form, initialValues: { name } },
                React.createElement(Form.Item, { required: true, name: 'name', rules: React.useMemo(() => [
                        {
                            required: true,
                            message: 'Название фильтра обязательно для заполнения',
                        },
                        {
                            required: true,
                            message: 'Фильтр с таким названием уже существует',
                            validator: () => {
                                const state = form.getFieldsValue();
                                if (!state.name)
                                    return Promise.resolve();
                                const isExist = presets
                                    .map(preset => preset.label)
                                    .includes(state.name);
                                if (!isExist)
                                    return Promise.resolve();
                                return Promise.reject();
                            },
                        },
                    ], [form, presets]) },
                    React.createElement(Input, { placeholder: '\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0444\u0438\u043B\u044C\u0442\u0440\u0430' }))))));
};
SaveButton.displayName = 'Filters.SaveButton';

export { SaveButton };
