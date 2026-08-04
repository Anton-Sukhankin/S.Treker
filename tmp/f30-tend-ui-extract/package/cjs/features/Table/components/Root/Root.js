'use strict';

var React = require('react');
var isUndefined = require('@10d/tend-ui-utils/isUndefined');
var tendUiHooks = require('@10d/tend-ui-hooks');
var Form = require('../../../../components/Form/Form.js');
var ColumnsContext = require('../../contexts/ColumnsContext.js');
var FiltersContext = require('../../contexts/FiltersContext.js');
var FormContext = require('../../contexts/FormContext.js');
var SortersContext = require('../../contexts/SortersContext.js');
var ValueContext = require('../../contexts/ValueContext.js');
var DefaultValueContext = require('../../contexts/DefaultValueContext.js');
var Scope = require('../../consts/Scope.js');
var hooks = require('./hooks.js');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

const Root = ({ debounce, form, value, defaultValue, columns = [], filters = [], sorters = [], children, onFilterValuesChange, onSorterValuesChange, onSearchValueChange, onColumnVisibilityChange, onColumnPinningChange, onFilterReset, onFiltersReset, }) => {
    const [_form] = Form.Form.useForm(form);
    const debouncedOnFilterValuesChange = tendUiHooks.useDebouncedCallback((...params) => {
        onFilterValuesChange === null || onFilterValuesChange === void 0 ? void 0 : onFilterValuesChange(...params);
    }, debounce);
    const debouncedOnSorterValuesChange = tendUiHooks.useDebouncedCallback((...params) => {
        onSorterValuesChange === null || onSorterValuesChange === void 0 ? void 0 : onSorterValuesChange(...params);
    }, debounce);
    const debouncedOnSearchValueChange = tendUiHooks.useDebouncedCallback((...params) => {
        onSearchValueChange === null || onSearchValueChange === void 0 ? void 0 : onSearchValueChange(...params);
    }, debounce);
    const handleFormChange = hooks.useFormChangeCallback({
        filters,
        onFilterValuesChange: debouncedOnFilterValuesChange,
        onSorterValuesChange: debouncedOnSorterValuesChange,
        onSearchValueChange: debouncedOnSearchValueChange,
    });
    const clear = React__default["default"].useCallback(
    // FIXME: Исправить типизацию
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (name) => {
        _form.resetFields([name]);
        const values = _form.getFieldValue(Scope.Scope.Filters);
        const _name = name[1];
        const changed = { [_name]: undefined };
        onFilterValuesChange === null || onFilterValuesChange === void 0 ? void 0 : onFilterValuesChange(changed, values);
        onFilterReset === null || onFilterReset === void 0 ? void 0 : onFilterReset();
    }, [_form, onFilterReset, onFilterValuesChange]);
    const reset = React__default["default"].useCallback(() => {
        const values = _form.getFieldsValue()[Scope.Scope.Filters];
        onFilterValuesChange === null || onFilterValuesChange === void 0 ? void 0 : onFilterValuesChange(values, values);
        onFiltersReset === null || onFiltersReset === void 0 ? void 0 : onFiltersReset();
    }, [_form, onFilterValuesChange, onFiltersReset]);
    const pin = React__default["default"].useCallback((position, column) => {
        onColumnPinningChange === null || onColumnPinningChange === void 0 ? void 0 : onColumnPinningChange(position, column);
    }, [onColumnPinningChange]);
    const display = React__default["default"].useCallback((visible, column) => {
        onColumnVisibilityChange === null || onColumnVisibilityChange === void 0 ? void 0 : onColumnVisibilityChange(visible, column);
    }, [onColumnVisibilityChange]);
    /**
     * Дефолтные значения инициализируем только единожды
     */
    React__default["default"].useEffect(() => {
        if (isUndefined.isUndefined(defaultValue))
            return;
        // FIXME: Fix types collisions
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        _form.setFieldsValue(defaultValue);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    React__default["default"].useEffect(() => {
        if (isUndefined.isUndefined(value))
            return;
        // FIXME: Fix types collisions
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        _form.setFieldsValue(value);
    }, [_form, value]);
    return (React__default["default"].createElement(FormContext.FormContext, { value: React__default["default"].useMemo(() => ({ form: _form }), [_form]) },
        React__default["default"].createElement(DefaultValueContext.DefaultValueContext.Provider, { value: React__default["default"].useMemo(() => defaultValue, [defaultValue]) },
            React__default["default"].createElement(ValueContext.ValueContext.Provider, { value: React__default["default"].useMemo(() => value, [value]) },
                React__default["default"].createElement(SortersContext.SortersContext, { value: React__default["default"].useMemo(() => ({ sorters }), [sorters]) },
                    React__default["default"].createElement(FiltersContext.FiltersContext, { value: React__default["default"].useMemo(() => ({ form, filters, clear, reset }), [filters, form, clear, reset]) },
                        React__default["default"].createElement(ColumnsContext.ColumnsContext, { value: React__default["default"].useMemo(() => ({ columns, display, pin }), [columns, display, pin]) },
                            React__default["default"].createElement(Form.Form.Provider, { onFormChange: handleFormChange }, children))))))));
};
Root.displayName = 'Root';

exports.Root = Root;
