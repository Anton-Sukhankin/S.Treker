'use strict';

var React = require('react');
var tendUiPrimitives = require('@10d/tend-ui-primitives');
var uuid = require('uuid');
var Bookmark = require('@10d/tend-ui-icons/Bookmark');
var isEqual = require('lodash/isEqual');
var pickBy = require('lodash/pickBy');
var identity = require('lodash/identity');
var useBoolean = require('../../../../hooks/useBoolean/useBoolean.js');
var Form = require('../../../Form/Form.js');
var Modal = require('../../../../primitives/Modal/Modal.js');
var FiltersFormProvider = require('../../core/FiltersFormProvider.js');
var FiltersPresetsContext = require('../../contexts/FiltersPresetsContext.js');
var useNextFilterName = require('./useNextFilterName.js');
var useValuesObserver = require('../../hooks/useValuesObserver.js');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);
var isEqual__default = /*#__PURE__*/_interopDefault(isEqual);
var pickBy__default = /*#__PURE__*/_interopDefault(pickBy);
var identity__default = /*#__PURE__*/_interopDefault(identity);

const SaveButton = ({ INTERNAL_scope }) => {
    const [form] = Form.Form.useForm();
    const { presets } = FiltersPresetsContext.useFiltersPresetsProvider('Filters.SaveButton');
    const model = FiltersFormProvider.useFiltersFormProvider('Filters.SaveButton');
    const fp = FiltersPresetsContext.useFiltersPresetsProvider('Filters.SaveButton');
    const [open, toggle] = useBoolean.useBoolean(false);
    const values = useValuesObserver.useValuesObserver('Filters.SaveButton', model.form, INTERNAL_scope);
    const name = useNextFilterName.useNextFilterName(presets.map(preset => preset.label));
    const isPresetExist = React__default["default"].useMemo(() => presets.some(preset => isEqual__default["default"](pickBy__default["default"](values, identity__default["default"]), preset.value), []), [presets, values]);
    const hasAppliedFilters = React__default["default"].useMemo(() => Object.values(values || {})
        .filter(Boolean)
        .flat().length > 0, [values]);
    const help = [
        [!hasAppliedFilters, 'Вы не выбрали ни одного фильтра'],
        [isPresetExist, 'Такой набор фильтров уже существует'],
    ];
    const [, title] = help.filter(([condition]) => condition)[0] || [];
    return (React__default["default"].createElement(React__default["default"].Fragment, null,
        React__default["default"].createElement(tendUiPrimitives.Tooltip, { title: title },
            React__default["default"].createElement(tendUiPrimitives.Button, { before: React__default["default"].createElement(Bookmark.Bookmark, null), "data-testid": 'tend-ui-filters-save-button', disabled: !hasAppliedFilters || isPresetExist, variant: 'secondary', size: 'small', onClick: () => {
                    toggle();
                } })),
        React__default["default"].createElement(Modal.Modal, { "data-testid": 'tend-ui-filters-save-preset-modal', open: open, size: 'small', title: '\u0423\u043A\u0430\u0436\u0438\u0442\u0435 \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0444\u0438\u043B\u044C\u0442\u0440\u0430', cancelButtonProps: { variant: 'link' }, okText: '\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C \u0444\u0438\u043B\u044C\u0442\u0440', onOk: React__default["default"].useCallback(() => {
                form.validateFields().then(payload => {
                    if (!payload.name)
                        return;
                    const value = model.getScopedState();
                    fp.onSave({
                        id: uuid.v4(),
                        label: payload.name,
                        value,
                    });
                    toggle();
                    form.resetFields();
                });
            }, [form, model, fp, toggle]), onCancel: () => toggle() },
            React__default["default"].createElement(Form.Form, { form: form, initialValues: { name } },
                React__default["default"].createElement(Form.Form.Item, { required: true, name: 'name', rules: React__default["default"].useMemo(() => [
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
                    React__default["default"].createElement(tendUiPrimitives.Input, { placeholder: '\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0444\u0438\u043B\u044C\u0442\u0440\u0430' }))))));
};
SaveButton.displayName = 'Filters.SaveButton';

exports.SaveButton = SaveButton;
