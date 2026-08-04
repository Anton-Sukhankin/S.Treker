'use strict';

var tslib = require('tslib');
var React = require('react');
var Close = require('@10d/tend-ui-icons/Close');
var Done = require('@10d/tend-ui-icons/Done');
var tendUiTypography = require('@10d/tend-ui-typography');
var tendUiTheme = require('@10d/tend-ui-theme');
var useAllowClear = require('../../hooks/useAllowClear.js');
var useSize = require('../../hooks/useSize.js');
var tendUiPrimitives = require('@10d/tend-ui-primitives');
var tendUiGrid = require('@10d/tend-ui-grid');
var Checkbox = require('../Checkbox/Checkbox.js');
var styled = require('./styled.js');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

const BaseSelect = (_a, ref) => {
    var { fullWidth, width, maxTagCount = 2, allowClear, clearIconTooltip, loading = false, disabled, notFoundContent, dropdownRender, onDropdownVisibleChange, open, customSuffixIcon, optionDescription, optionRender } = _a, props = tslib.__rest(_a, ["fullWidth", "width", "maxTagCount", "allowClear", "clearIconTooltip", "loading", "disabled", "notFoundContent", "dropdownRender", "onDropdownVisibleChange", "open", "customSuffixIcon", "optionDescription", "optionRender"]);
    const theme = tendUiTheme.useTheme();
    const allowClearProp = useAllowClear.useAllowClear({ allowClear, clearIconTooltip });
    const size = useSize.useSize(props.size);
    const [innerOpen, setInnerOpen] = React__default["default"].useState(false);
    const isMultiple = props.mode === 'multiple';
    const openProp = typeof open === 'boolean' ? open : innerOpen;
    const handleDropdownVisibleChange = React__default["default"].useCallback((flag) => {
        setInnerOpen(flag);
        onDropdownVisibleChange === null || onDropdownVisibleChange === void 0 ? void 0 : onDropdownVisibleChange(flag);
    }, [onDropdownVisibleChange]);
    const maxTagPlaceholder = React__default["default"].useCallback((values) => {
        return `+${values.length}`;
    }, []);
    const handleArrowClick = React__default["default"].useCallback(() => {
        if (disabled)
            return;
        setInnerOpen(prevOpen => !prevOpen);
        onDropdownVisibleChange === null || onDropdownVisibleChange === void 0 ? void 0 : onDropdownVisibleChange(!openProp);
    }, [onDropdownVisibleChange, openProp, disabled]);
    const suffixIcon = React__default["default"].useMemo(() => {
        if (loading)
            return React__default["default"].createElement(tendUiPrimitives.Spinner, { size: 'xs' });
        if (customSuffixIcon !== undefined)
            return customSuffixIcon;
        return (React__default["default"].createElement(styled.ArrowIcon, { size: 16, "$disabled": disabled, "$open": openProp, onClick: handleArrowClick }));
    }, [loading, customSuffixIcon, disabled, openProp, handleArrowClick]);
    const notFoundContentProp = React__default["default"].useMemo(() => {
        if (loading)
            return React__default["default"].createElement(tendUiGrid.Box, { "$height": '200px' });
        if (notFoundContent)
            return notFoundContent;
    }, [loading, notFoundContent]);
    const dropdownRenderProp = React__default["default"].useCallback((menu) => {
        const children = dropdownRender ? dropdownRender(menu) : menu;
        return (React__default["default"].createElement(tendUiPrimitives.Spinner, { loading: loading, color: theme.colors.blue600, size: 'small' }, children));
    }, [dropdownRender, loading, theme.colors.blue600]);
    const menuItemSelectedIcon = React__default["default"].useMemo(() => {
        if (isMultiple)
            return (props) => React__default["default"].createElement(Checkbox.Checkbox, { checked: props.isSelected });
        return React__default["default"].createElement(Done.Done, null);
    }, [isMultiple]);
    const _optionRender = React__default["default"].useMemo(() => {
        if (optionRender || !optionDescription)
            return optionRender;
        return option => {
            const description = typeof optionDescription === 'function'
                ? optionDescription({ label: option.label, value: option.value })
                : optionDescription;
            return (React__default["default"].createElement(tendUiGrid.Box, { "$display": 'flex', "$flexDirection": 'column' },
                option.label,
                React__default["default"].createElement(tendUiTypography.Text, { size: 'small', color: 'gray650' }, description)));
        };
    }, [optionDescription, optionRender]);
    return (React__default["default"].createElement(styled.Root, Object.assign({ "data-testid": 'tend-ui-select', maxTagPlaceholder: maxTagPlaceholder, open: openProp, menuItemSelectedIcon: menuItemSelectedIcon }, props, { ref: ref, "$theme": theme, "$fullWidth": fullWidth, "$width": width, "$multi": isMultiple, loading: loading, disabled: disabled, allowClear: allowClearProp, onDropdownVisibleChange: handleDropdownVisibleChange, maxTagCount: maxTagCount, suffixIcon: suffixIcon, removeIcon: React__default["default"].createElement(Close.Close, { color: theme.colors.gray900 }), size: size, notFoundContent: notFoundContentProp, dropdownRender: dropdownRenderProp, optionRender: _optionRender })));
};
const Select = React__default["default"].forwardRef(BaseSelect);
Select.displayName = 'Select';

exports.Select = Select;
