import React from 'react';
import omit from 'lodash/omit';
import { Drawer, Spinner } from '@10d/tend-ui-primitives';
import { useTranslation } from '@10d/tend-ui-locale/hooks/useTranslation';
import { Title, Text } from '@10d/tend-ui-typography';
import { isUndefined, isString, INTERNAL_TendUILogger } from '@10d/tend-ui-utils';
import { Form } from '../Form/Form.js';
import { Collapse } from '../../ui/Collapse/Collapse.js';
import { Box } from '@10d/tend-ui-grid';
import { Badge } from '../../primitives/Badge/Badge.js';
import { Divider } from '../../ui/Divider/Divider.js';
import { AsyncCheckboxFilter } from './core/AsyncCheckboxFilter/AsyncCheckboxFilter.js';
import { AsyncRadioFilter } from './core/AsyncRadioFilter/AsyncRadioFilter.js';
import { AsyncSelectFilter } from './core/AsyncSelectFilter/AsyncSelectFilter.js';
import { CheckboxFilter } from './core/CheckboxFilter/CheckboxFilter.js';
import { CheckboxGroupFilter } from './core/CheckboxGroupFilter/CheckboxGroupFilter.js';
import { DatePickerFilter } from './core/DatePickerFilter/DatePickerFilter.js';
import { InputFilter } from './core/InputFilter/InputFilter.js';
import { RadioFilter } from './core/RadioFilter/RadioFilter.js';
import { RadioGroupFilter } from './core/RadioGroupFilter/RadioGroupFilter.js';
import { RangePickerFilter } from './core/RangePickerFilter/RangePickerFilter.js';
import { ToggleFilter } from './core/ToggleFilter/ToggleFilter.js';
import { SelectFilter } from './core/SelectFilter/SelectFilter.js';
import { CheckboxGroupSearchFilter } from './core/CheckboxGroupSearchFilter/CheckboxGroupSearchFilter.js';
import { RadioGroupSearchFilter } from './core/RadioGroupSearchFilter/RadioGroupSearchFilter.js';
import { InputNumberFilter } from './core/InputNumberFilter/InputNumberFilter.js';
import { ResetButton } from './components/ResetButton/ResetButton.js';
import { Root } from './components/Root/Root.js';
import { List } from './components/List/List.js';
import { Form as Form$1 } from './components/Form/Form.js';
import { PresetsList } from './components/PresetsList/PresetsList.js';
import { SaveButton } from './components/SaveButton/SaveButton.js';
import { ResetAllButton } from './components/ResetAllButton/ResetAllButton.js';
import { useFilterCounter } from './hooks/useFilterCounter.js';
import { useFiltersFormProvider } from './core/FiltersFormProvider.js';

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
const FilterPicker = React.memo(props => {
    switch (props.component) {
        case 'input':
            return React.createElement(InputFilter, Object.assign({}, omit(props, 'component')));
        case 'input-number':
            return React.createElement(InputNumberFilter, Object.assign({}, omit(props, 'component')));
        case 'select':
            return React.createElement(SelectFilter, Object.assign({}, omit(props, 'component')));
        case 'async-select':
            return React.createElement(AsyncSelectFilter, Object.assign({}, omit(props, 'component')));
        case 'async-checkbox':
            return React.createElement(AsyncCheckboxFilter, Object.assign({}, omit(props, 'component')));
        case 'async-radio':
            return React.createElement(AsyncRadioFilter, Object.assign({}, omit(props, 'component')));
        case 'toggle':
            return React.createElement(ToggleFilter, Object.assign({}, omit(props, 'component')));
        case 'checkbox':
            return React.createElement(CheckboxFilter, Object.assign({}, omit(props, 'component')));
        case 'checkbox-group':
            return React.createElement(CheckboxGroupFilter, Object.assign({}, omit(props, 'component')));
        case 'checkbox-group-search':
            return React.createElement(CheckboxGroupSearchFilter, Object.assign({}, omit(props, 'component')));
        case 'radio':
            return React.createElement(RadioFilter, Object.assign({}, omit(props, 'component')));
        case 'radio-group':
            return React.createElement(RadioGroupFilter, Object.assign({}, omit(props, 'component')));
        case 'radio-group-search':
            return React.createElement(RadioGroupSearchFilter, Object.assign({}, omit(props, 'component')));
        case 'date-picker':
            return React.createElement(DatePickerFilter, Object.assign({}, omit(props, 'component')));
        case 'range-picker':
            return React.createElement(RangePickerFilter, Object.assign({}, omit(props, 'component')));
        default:
            return React.createElement("span", null, "Filter is not supported");
    }
});
const Filter = ({ filter, INTERNAL_scope, }) => {
    if (process.env.NODE_ENV === 'development') {
        INTERNAL_TendUILogger.warning([
            '<Filters /> из пакета "@10d/tend-ui" устарел и больше не поддерживается.',
            '',
            'Используйте <Filters /> из пакета "@10d/tend-ui-filters"',
        ]);
    }
    const { onClear } = useFiltersFormProvider('Filters.Filter');
    const name = INTERNAL_scope ? [INTERNAL_scope, filter.name] : filter.name;
    const count = useFilterCounter(name);
    const handleReset = React.useCallback((e) => {
        // Клик по кнопке триггерит закрытие колапса, предотвращаем
        // FIXME: Реализовать свойство "зона клика" в колапсе по подобию antd
        // чтобы можно было выбирать область срабатывания и не останавливать
        // всплытие ивента
        e.stopPropagation();
        onClear === null || onClear === void 0 ? void 0 : onClear(filter.name);
    }, [filter.name, onClear]);
    const shouldRender = typeof count === 'number' ? count > 0 : false;
    return (React.createElement(Collapse, { id: filter.id, label: React.createElement(Box, { "$display": 'flex', "$alignItems": 'center', "$justifyContent": 'space-between', "$width": '100%', "$minHeight": '20px' },
            React.createElement(Box, { "$display": 'flex', "$alignItems": 'center', "$gap": 4 },
                React.createElement(Text, { strong: true }, filter.label),
                shouldRender && React.createElement(Badge, { preset: 'blue', inner: count })),
            shouldRender && React.createElement(ResetButton, { filter: filter, onClick: handleReset })) },
        React.createElement(Form.Item, { noStyle: true, name: name, valuePropName: valuePropNameFactory(filter) },
            React.createElement(FilterPicker, Object.assign({ config: filter, INTERNAL_scope: INTERNAL_scope }, filter.component)))));
};
/**
 * @deprecated Компонент устарел и больше не поддерживается. Используйте компонент из пакета `@10d/tend-ui-filters`
 */
const Filters = ({ value, debounce = true, loading = false, open, name, title, filters, form, onFilterValuesChange, onClose, onFiltersReset, onFilterReset, resetAllButtonProps, INTERNAL_scope, showPresets = false, presets, defaultPresets, onPresetEdit, onPresetRemove, onPresetSave, onPresetsChange, }) => {
    const [_form] = Form.useForm(form);
    const t = useTranslation();
    const _title = React.useMemo(() => {
        if (isUndefined(title))
            return (React.createElement(Title, { margin: '0', level: 'h5', style: { flex: '1' } }, t(['components', 'Filters', 'title'])));
        if (isString(title))
            return (React.createElement(Title, { margin: '0', level: 'h5', style: { flex: '1' } }, title));
        return title;
    }, [t, title]);
    return (React.createElement(Drawer.Root, { "data-testid": 'tend-ui-filters-drawer', open: open, onClose: onClose },
        React.createElement(Root, { "data-testid": 'tend-ui-filters-root', debounce: debounce, value: value, filters: filters, name: name, form: _form, onFilterValuesChange: onFilterValuesChange, onFilterReset: onFilterReset, onFiltersReset: onFiltersReset, INTERNAL_scope: INTERNAL_scope, presets: presets, defaultPresets: defaultPresets, onPresetEdit: onPresetEdit, onPresetRemove: onPresetRemove, onPresetSave: onPresetSave, onPresetsChange: onPresetsChange },
            React.createElement(Drawer.Header, null,
                _title,
                React.createElement(Box, { "$display": 'flex', "$alignItems": 'center', "$gap": 8 },
                    showPresets && React.createElement(SaveButton, { INTERNAL_scope: INTERNAL_scope }),
                    React.createElement(ResetAllButton, Object.assign({}, resetAllButtonProps)),
                    React.createElement(Drawer.CloseButton, null))),
            React.createElement(Drawer.Body, null,
                React.createElement(Spinner, { loading: loading },
                    React.createElement(Form$1, null,
                        React.createElement(List, null,
                            showPresets && (React.createElement(React.Fragment, null,
                                React.createElement(PresetsList, { INTERNAL_scope: INTERNAL_scope }),
                                React.createElement(Divider, { padding: '0' }))),
                            filters.map(filter => (React.createElement(Filter, { key: createReactKey(filter), filter: filter, INTERNAL_scope: INTERNAL_scope }))))))))));
};
Filters.displayName = 'Filters';
Filters.Root = Root;
Filters.Form = Form$1;
Filters.List = List;
Filters.CollapseGroup = Collapse.Group;
Filters.Filter = Filter;

export { FilterPicker, Filters };
