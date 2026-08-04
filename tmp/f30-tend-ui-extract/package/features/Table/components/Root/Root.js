import React from 'react';
import { isUndefined } from '@10d/tend-ui-utils/isUndefined';
import { useDebouncedCallback } from '@10d/tend-ui-hooks';
import { Form } from '../../../../components/Form/Form.js';
import { ColumnsContext } from '../../contexts/ColumnsContext.js';
import { FiltersContext } from '../../contexts/FiltersContext.js';
import { FormContext } from '../../contexts/FormContext.js';
import { SortersContext } from '../../contexts/SortersContext.js';
import { ValueContext } from '../../contexts/ValueContext.js';
import { DefaultValueContext } from '../../contexts/DefaultValueContext.js';
import { Scope } from '../../consts/Scope.js';
import { useFormChangeCallback } from './hooks.js';

const Root = ({ debounce, form, value, defaultValue, columns = [], filters = [], sorters = [], children, onFilterValuesChange, onSorterValuesChange, onSearchValueChange, onColumnVisibilityChange, onColumnPinningChange, onFilterReset, onFiltersReset, }) => {
    const [_form] = Form.useForm(form);
    const debouncedOnFilterValuesChange = useDebouncedCallback((...params) => {
        onFilterValuesChange === null || onFilterValuesChange === void 0 ? void 0 : onFilterValuesChange(...params);
    }, debounce);
    const debouncedOnSorterValuesChange = useDebouncedCallback((...params) => {
        onSorterValuesChange === null || onSorterValuesChange === void 0 ? void 0 : onSorterValuesChange(...params);
    }, debounce);
    const debouncedOnSearchValueChange = useDebouncedCallback((...params) => {
        onSearchValueChange === null || onSearchValueChange === void 0 ? void 0 : onSearchValueChange(...params);
    }, debounce);
    const handleFormChange = useFormChangeCallback({
        filters,
        onFilterValuesChange: debouncedOnFilterValuesChange,
        onSorterValuesChange: debouncedOnSorterValuesChange,
        onSearchValueChange: debouncedOnSearchValueChange,
    });
    const clear = React.useCallback(
    // FIXME: Исправить типизацию
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (name) => {
        _form.resetFields([name]);
        const values = _form.getFieldValue(Scope.Filters);
        const _name = name[1];
        const changed = { [_name]: undefined };
        onFilterValuesChange === null || onFilterValuesChange === void 0 ? void 0 : onFilterValuesChange(changed, values);
        onFilterReset === null || onFilterReset === void 0 ? void 0 : onFilterReset();
    }, [_form, onFilterReset, onFilterValuesChange]);
    const reset = React.useCallback(() => {
        const values = _form.getFieldsValue()[Scope.Filters];
        onFilterValuesChange === null || onFilterValuesChange === void 0 ? void 0 : onFilterValuesChange(values, values);
        onFiltersReset === null || onFiltersReset === void 0 ? void 0 : onFiltersReset();
    }, [_form, onFilterValuesChange, onFiltersReset]);
    const pin = React.useCallback((position, column) => {
        onColumnPinningChange === null || onColumnPinningChange === void 0 ? void 0 : onColumnPinningChange(position, column);
    }, [onColumnPinningChange]);
    const display = React.useCallback((visible, column) => {
        onColumnVisibilityChange === null || onColumnVisibilityChange === void 0 ? void 0 : onColumnVisibilityChange(visible, column);
    }, [onColumnVisibilityChange]);
    /**
     * Дефолтные значения инициализируем только единожды
     */
    React.useEffect(() => {
        if (isUndefined(defaultValue))
            return;
        // FIXME: Fix types collisions
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        _form.setFieldsValue(defaultValue);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    React.useEffect(() => {
        if (isUndefined(value))
            return;
        // FIXME: Fix types collisions
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        _form.setFieldsValue(value);
    }, [_form, value]);
    return (React.createElement(FormContext, { value: React.useMemo(() => ({ form: _form }), [_form]) },
        React.createElement(DefaultValueContext.Provider, { value: React.useMemo(() => defaultValue, [defaultValue]) },
            React.createElement(ValueContext.Provider, { value: React.useMemo(() => value, [value]) },
                React.createElement(SortersContext, { value: React.useMemo(() => ({ sorters }), [sorters]) },
                    React.createElement(FiltersContext, { value: React.useMemo(() => ({ form, filters, clear, reset }), [filters, form, clear, reset]) },
                        React.createElement(ColumnsContext, { value: React.useMemo(() => ({ columns, display, pin }), [columns, display, pin]) },
                            React.createElement(Form.Provider, { onFormChange: handleFormChange }, children))))))));
};
Root.displayName = 'Root';

export { Root };
