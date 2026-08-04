'use strict';

var React = require('react');
var omit = require('lodash/omit');
var tendUiPrimitives = require('@10d/tend-ui-primitives');
var useTranslation = require('@10d/tend-ui-locale/hooks/useTranslation');
var tendUiTypography = require('@10d/tend-ui-typography');
var tendUiUtils = require('@10d/tend-ui-utils');
var Form = require('../Form/Form.js');
var Collapse = require('../../ui/Collapse/Collapse.js');
var tendUiGrid = require('@10d/tend-ui-grid');
var Badge = require('../../primitives/Badge/Badge.js');
var Divider = require('../../ui/Divider/Divider.js');
var AsyncCheckboxFilter = require('./core/AsyncCheckboxFilter/AsyncCheckboxFilter.js');
var AsyncRadioFilter = require('./core/AsyncRadioFilter/AsyncRadioFilter.js');
var AsyncSelectFilter = require('./core/AsyncSelectFilter/AsyncSelectFilter.js');
var CheckboxFilter = require('./core/CheckboxFilter/CheckboxFilter.js');
var CheckboxGroupFilter = require('./core/CheckboxGroupFilter/CheckboxGroupFilter.js');
var DatePickerFilter = require('./core/DatePickerFilter/DatePickerFilter.js');
var InputFilter = require('./core/InputFilter/InputFilter.js');
var RadioFilter = require('./core/RadioFilter/RadioFilter.js');
var RadioGroupFilter = require('./core/RadioGroupFilter/RadioGroupFilter.js');
var RangePickerFilter = require('./core/RangePickerFilter/RangePickerFilter.js');
var ToggleFilter = require('./core/ToggleFilter/ToggleFilter.js');
var SelectFilter = require('./core/SelectFilter/SelectFilter.js');
var CheckboxGroupSearchFilter = require('./core/CheckboxGroupSearchFilter/CheckboxGroupSearchFilter.js');
var RadioGroupSearchFilter = require('./core/RadioGroupSearchFilter/RadioGroupSearchFilter.js');
var InputNumberFilter = require('./core/InputNumberFilter/InputNumberFilter.js');
var ResetButton = require('./components/ResetButton/ResetButton.js');
var Root = require('./components/Root/Root.js');
var List = require('./components/List/List.js');
var Form$1 = require('./components/Form/Form.js');
var PresetsList = require('./components/PresetsList/PresetsList.js');
var SaveButton = require('./components/SaveButton/SaveButton.js');
var ResetAllButton = require('./components/ResetAllButton/ResetAllButton.js');
var useFilterCounter = require('./hooks/useFilterCounter.js');
var FiltersFormProvider = require('./core/FiltersFormProvider.js');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);
var omit__default = /*#__PURE__*/_interopDefault(omit);

const createReactKey = (config) => {
    var _a;
    return (_a = config.key) !== null && _a !== void 0 ? _a : `tend-ui-filters-list-filter-${config.id}`;
};
const valuePropNameFactory = (config) => {
    const isCheckable = ['toggle', 'checkbox', 'radio'].includes(config.component.component);
    if (!isCheckable)
        return;
    return 'checked';
};
const FilterPicker = React__default["default"].memo(props => {
    switch (props.component) {
        case 'input':
            return React__default["default"].createElement(InputFilter.InputFilter, Object.assign({}, omit__default["default"](props, 'component')));
        case 'input-number':
            return React__default["default"].createElement(InputNumberFilter.InputNumberFilter, Object.assign({}, omit__default["default"](props, 'component')));
        case 'select':
            return React__default["default"].createElement(SelectFilter.SelectFilter, Object.assign({}, omit__default["default"](props, 'component')));
        case 'async-select':
            return React__default["default"].createElement(AsyncSelectFilter.AsyncSelectFilter, Object.assign({}, omit__default["default"](props, 'component')));
        case 'async-checkbox':
            return React__default["default"].createElement(AsyncCheckboxFilter.AsyncCheckboxFilter, Object.assign({}, omit__default["default"](props, 'component')));
        case 'async-radio':
            return React__default["default"].createElement(AsyncRadioFilter.AsyncRadioFilter, Object.assign({}, omit__default["default"](props, 'component')));
        case 'toggle':
            return React__default["default"].createElement(ToggleFilter.ToggleFilter, Object.assign({}, omit__default["default"](props, 'component')));
        case 'checkbox':
            return React__default["default"].createElement(CheckboxFilter.CheckboxFilter, Object.assign({}, omit__default["default"](props, 'component')));
        case 'checkbox-group':
            return React__default["default"].createElement(CheckboxGroupFilter.CheckboxGroupFilter, Object.assign({}, omit__default["default"](props, 'component')));
        case 'checkbox-group-search':
            return React__default["default"].createElement(CheckboxGroupSearchFilter.CheckboxGroupSearchFilter, Object.assign({}, omit__default["default"](props, 'component')));
        case 'radio':
            return React__default["default"].createElement(RadioFilter.RadioFilter, Object.assign({}, omit__default["default"](props, 'component')));
        case 'radio-group':
            return React__default["default"].createElement(RadioGroupFilter.RadioGroupFilter, Object.assign({}, omit__default["default"](props, 'component')));
        case 'radio-group-search':
            return React__default["default"].createElement(RadioGroupSearchFilter.RadioGroupSearchFilter, Object.assign({}, omit__default["default"](props, 'component')));
        case 'date-picker':
            return React__default["default"].createElement(DatePickerFilter.DatePickerFilter, Object.assign({}, omit__default["default"](props, 'component')));
        case 'range-picker':
            return React__default["default"].createElement(RangePickerFilter.RangePickerFilter, Object.assign({}, omit__default["default"](props, 'component')));
        default:
            return React__default["default"].createElement("span", null, "Filter is not supported");
    }
});
const Filter = ({ filter, INTERNAL_scope, }) => {
    if (process.env.NODE_ENV === 'development') {
        tendUiUtils.INTERNAL_TendUILogger.warning([
            '<Filters /> из пакета "@10d/tend-ui" устарел и больше не поддерживается.',
            '',
            'Используйте <Filters /> из пакета "@10d/tend-ui-filters"',
        ]);
    }
    const { onClear } = FiltersFormProvider.useFiltersFormProvider('Filters.Filter');
    const name = INTERNAL_scope ? [INTERNAL_scope, filter.name] : filter.name;
    const count = useFilterCounter.useFilterCounter(name);
    const handleReset = React__default["default"].useCallback((e) => {
        // Клик по кнопке триггерит закрытие колапса, предотвращаем
        // FIXME: Реализовать свойство "зона клика" в колапсе по подобию antd
        // чтобы можно было выбирать область срабатывания и не останавливать
        // всплытие ивента
        e.stopPropagation();
        onClear === null || onClear === void 0 ? void 0 : onClear(filter.name);
    }, [filter.name, onClear]);
    const shouldRender = typeof count === 'number' ? count > 0 : false;
    return (React__default["default"].createElement(Collapse.Collapse, { id: filter.id, label: React__default["default"].createElement(tendUiGrid.Box, { "$display": 'flex', "$alignItems": 'center', "$justifyContent": 'space-between', "$width": '100%', "$minHeight": '20px' },
            React__default["default"].createElement(tendUiGrid.Box, { "$display": 'flex', "$alignItems": 'center', "$gap": 4 },
                React__default["default"].createElement(tendUiTypography.Text, { strong: true }, filter.label),
                shouldRender && React__default["default"].createElement(Badge.Badge, { preset: 'blue', inner: count })),
            shouldRender && React__default["default"].createElement(ResetButton.ResetButton, { filter: filter, onClick: handleReset })) },
        React__default["default"].createElement(Form.Form.Item, { noStyle: true, name: name, valuePropName: valuePropNameFactory(filter) },
            React__default["default"].createElement(FilterPicker, Object.assign({ config: filter, INTERNAL_scope: INTERNAL_scope }, filter.component)))));
};
/**
 * @deprecated Компонент устарел и больше не поддерживается. Используйте компонент из пакета `@10d/tend-ui-filters`
 */
const Filters = ({ value, debounce = true, loading = false, open, name, title, filters, form, onFilterValuesChange, onClose, onFiltersReset, onFilterReset, resetAllButtonProps, INTERNAL_scope, showPresets = false, presets, defaultPresets, onPresetEdit, onPresetRemove, onPresetSave, onPresetsChange, }) => {
    const [_form] = Form.Form.useForm(form);
    const t = useTranslation.useTranslation();
    const _title = React__default["default"].useMemo(() => {
        if (tendUiUtils.isUndefined(title))
            return (React__default["default"].createElement(tendUiTypography.Title, { margin: '0', level: 'h5', style: { flex: '1' } }, t(['components', 'Filters', 'title'])));
        if (tendUiUtils.isString(title))
            return (React__default["default"].createElement(tendUiTypography.Title, { margin: '0', level: 'h5', style: { flex: '1' } }, title));
        return title;
    }, [t, title]);
    return (React__default["default"].createElement(tendUiPrimitives.Drawer.Root, { "data-testid": 'tend-ui-filters-drawer', open: open, onClose: onClose },
        React__default["default"].createElement(Root.Root, { "data-testid": 'tend-ui-filters-root', debounce: debounce, value: value, filters: filters, name: name, form: _form, onFilterValuesChange: onFilterValuesChange, onFilterReset: onFilterReset, onFiltersReset: onFiltersReset, INTERNAL_scope: INTERNAL_scope, presets: presets, defaultPresets: defaultPresets, onPresetEdit: onPresetEdit, onPresetRemove: onPresetRemove, onPresetSave: onPresetSave, onPresetsChange: onPresetsChange },
            React__default["default"].createElement(tendUiPrimitives.Drawer.Header, null,
                _title,
                React__default["default"].createElement(tendUiGrid.Box, { "$display": 'flex', "$alignItems": 'center', "$gap": 8 },
                    showPresets && React__default["default"].createElement(SaveButton.SaveButton, { INTERNAL_scope: INTERNAL_scope }),
                    React__default["default"].createElement(ResetAllButton.ResetAllButton, Object.assign({}, resetAllButtonProps)),
                    React__default["default"].createElement(tendUiPrimitives.Drawer.CloseButton, null))),
            React__default["default"].createElement(tendUiPrimitives.Drawer.Body, null,
                React__default["default"].createElement(tendUiPrimitives.Spinner, { loading: loading },
                    React__default["default"].createElement(Form$1.Form, null,
                        React__default["default"].createElement(List.List, null,
                            showPresets && (React__default["default"].createElement(React__default["default"].Fragment, null,
                                React__default["default"].createElement(PresetsList.PresetsList, { INTERNAL_scope: INTERNAL_scope }),
                                React__default["default"].createElement(Divider.Divider, { padding: '0' }))),
                            filters.map(filter => (React__default["default"].createElement(Filter, { key: createReactKey(filter), filter: filter, INTERNAL_scope: INTERNAL_scope }))))))))));
};
Filters.displayName = 'Filters';
Filters.Root = Root.Root;
Filters.Form = Form$1.Form;
Filters.List = List.List;
Filters.CollapseGroup = Collapse.Collapse.Group;
Filters.Filter = Filter;

exports.FilterPicker = FilterPicker;
exports.Filters = Filters;
