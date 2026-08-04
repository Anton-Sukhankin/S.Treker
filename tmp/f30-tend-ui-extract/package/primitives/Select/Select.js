import { __rest } from 'tslib';
import React from 'react';
import { Close } from '@10d/tend-ui-icons/Close';
import { Done } from '@10d/tend-ui-icons/Done';
import { Text } from '@10d/tend-ui-typography';
import { useTheme } from '@10d/tend-ui-theme';
import { useAllowClear } from '../../hooks/useAllowClear.js';
import { useSize } from '../../hooks/useSize.js';
import { Spinner } from '@10d/tend-ui-primitives';
import { Box } from '@10d/tend-ui-grid';
import { Checkbox } from '../Checkbox/Checkbox.js';
import { ArrowIcon, Root } from './styled.js';

const BaseSelect = (_a, ref) => {
    var { fullWidth, width, maxTagCount = 2, allowClear, clearIconTooltip, loading = false, disabled, notFoundContent, dropdownRender, onDropdownVisibleChange, open, customSuffixIcon, optionDescription, optionRender } = _a, props = __rest(_a, ["fullWidth", "width", "maxTagCount", "allowClear", "clearIconTooltip", "loading", "disabled", "notFoundContent", "dropdownRender", "onDropdownVisibleChange", "open", "customSuffixIcon", "optionDescription", "optionRender"]);
    const theme = useTheme();
    const allowClearProp = useAllowClear({ allowClear, clearIconTooltip });
    const size = useSize(props.size);
    const [innerOpen, setInnerOpen] = React.useState(false);
    const isMultiple = props.mode === 'multiple';
    const openProp = typeof open === 'boolean' ? open : innerOpen;
    const handleDropdownVisibleChange = React.useCallback((flag) => {
        setInnerOpen(flag);
        onDropdownVisibleChange === null || onDropdownVisibleChange === void 0 ? void 0 : onDropdownVisibleChange(flag);
    }, [onDropdownVisibleChange]);
    const maxTagPlaceholder = React.useCallback((values) => {
        return `+${values.length}`;
    }, []);
    const handleArrowClick = React.useCallback(() => {
        if (disabled)
            return;
        setInnerOpen(prevOpen => !prevOpen);
        onDropdownVisibleChange === null || onDropdownVisibleChange === void 0 ? void 0 : onDropdownVisibleChange(!openProp);
    }, [onDropdownVisibleChange, openProp, disabled]);
    const suffixIcon = React.useMemo(() => {
        if (loading)
            return React.createElement(Spinner, { size: 'xs' });
        if (customSuffixIcon !== undefined)
            return customSuffixIcon;
        return (React.createElement(ArrowIcon, { size: 16, "$disabled": disabled, "$open": openProp, onClick: handleArrowClick }));
    }, [loading, customSuffixIcon, disabled, openProp, handleArrowClick]);
    const notFoundContentProp = React.useMemo(() => {
        if (loading)
            return React.createElement(Box, { "$height": '200px' });
        if (notFoundContent)
            return notFoundContent;
    }, [loading, notFoundContent]);
    const dropdownRenderProp = React.useCallback((menu) => {
        const children = dropdownRender ? dropdownRender(menu) : menu;
        return (React.createElement(Spinner, { loading: loading, color: theme.colors.blue600, size: 'small' }, children));
    }, [dropdownRender, loading, theme.colors.blue600]);
    const menuItemSelectedIcon = React.useMemo(() => {
        if (isMultiple)
            return (props) => React.createElement(Checkbox, { checked: props.isSelected });
        return React.createElement(Done, null);
    }, [isMultiple]);
    const _optionRender = React.useMemo(() => {
        if (optionRender || !optionDescription)
            return optionRender;
        return option => {
            const description = typeof optionDescription === 'function'
                ? optionDescription({ label: option.label, value: option.value })
                : optionDescription;
            return (React.createElement(Box, { "$display": 'flex', "$flexDirection": 'column' },
                option.label,
                React.createElement(Text, { size: 'small', color: 'gray650' }, description)));
        };
    }, [optionDescription, optionRender]);
    return (React.createElement(Root, Object.assign({ "data-testid": 'tend-ui-select', maxTagPlaceholder: maxTagPlaceholder, open: openProp, menuItemSelectedIcon: menuItemSelectedIcon }, props, { ref: ref, "$theme": theme, "$fullWidth": fullWidth, "$width": width, "$multi": isMultiple, loading: loading, disabled: disabled, allowClear: allowClearProp, onDropdownVisibleChange: handleDropdownVisibleChange, maxTagCount: maxTagCount, suffixIcon: suffixIcon, removeIcon: React.createElement(Close, { color: theme.colors.gray900 }), size: size, notFoundContent: notFoundContentProp, dropdownRender: dropdownRenderProp, optionRender: _optionRender })));
};
const Select = React.forwardRef(BaseSelect);
Select.displayName = 'Select';

export { Select };
