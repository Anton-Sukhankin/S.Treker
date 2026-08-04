import { __rest } from 'tslib';
import React from 'react';
import { isUndefined } from '@10d/tend-ui-utils';
import { extractMarginProps } from '@10d/tend-ui-styling';
import { CalendarMonth } from '@10d/tend-ui-icons/CalendarMonth';
import { useSize } from '../../hooks/useSize.js';
import { useAllowClear } from '../../hooks/useAllowClear.js';
import { useTheme } from '@10d/tend-ui-theme';
import { useDatePickerLocale } from '../../hooks/useDatePickerLocale.js';
import { Trigger } from './components/Trigger/Trigger.js';
import { NextIcon } from './components/NextIcon/styled.js';
import { PrevIcon } from './components/PrevIcon/styled.js';
import { Root } from './styled.js';
import { DatePickerContext } from './contexts/DatePickerContext.js';
import { DatePickerVisibilityContext } from './contexts/DatePickerVisibilityContext.js';

const createPicker = () => {
    const BaseDatePicker = React.forwardRef((_a, ref) => {
        var { fullWidth = false, showToday = false, allowClear = true, open, format = 'DD.MM.YYYY', clearIconTooltip, width = '256px', onChange, onOpenChange, suffixIcon = React.createElement(CalendarMonth, null), size = 'medium' } = _a, props = __rest(_a, ["fullWidth", "showToday", "allowClear", "open", "format", "clearIconTooltip", "width", "onChange", "onOpenChange", "suffixIcon", "size"]);
        const [_open, _setOpen] = React.useState(open !== null && open !== void 0 ? open : false);
        const [_value, _setValue] = React.useState(props.value);
        const __open = isUndefined(open) ? _open : open;
        const theme = useTheme();
        const _size = useSize(size);
        const allowClearProp = useAllowClear({ allowClear, clearIconTooltip });
        const locale = useDatePickerLocale(props.locale);
        const handleChange = React.useCallback((...parameters) => {
            onChange === null || onChange === void 0 ? void 0 : onChange(...parameters);
            _setValue(parameters[0]);
        }, [onChange]);
        const handleOpenChange = React.useCallback(open => {
            onOpenChange === null || onOpenChange === void 0 ? void 0 : onOpenChange(open);
            _setOpen === null || _setOpen === void 0 ? void 0 : _setOpen(open);
        }, [onOpenChange]);
        const _b = extractMarginProps(props), { rest } = _b, margins = __rest(_b, ["rest"]);
        const height = { large: '40px', medium: '32px', small: '24px' }[size];
        return (React.createElement(DatePickerVisibilityContext.Provider, { value: React.useMemo(() => ({ open: _open, setOpen: _setOpen }), [_open]) },
            React.createElement(DatePickerContext.Provider, { value: React.useMemo(() => (Object.assign(Object.assign({ fullWidth,
                    format,
                    showToday,
                    allowClear,
                    clearIconTooltip,
                    width,
                    onChange,
                    onOpenChange }, rest), { _value })), [
                    _value,
                    allowClear,
                    clearIconTooltip,
                    format,
                    fullWidth,
                    onChange,
                    onOpenChange,
                    rest,
                    showToday,
                    width,
                ]) },
                React.createElement(Root, Object.assign({ "data-testid": 'tend-ui-date-picker' }, rest, { ref: ref, "$fullWidth": fullWidth, "$width": width, "$height": height }, margins, { open: __open, size: _size, suffixIcon: suffixIcon, nextIcon: React.createElement(NextIcon, { color: theme.colors.blue600 }), superNextIcon: null, prevIcon: React.createElement(PrevIcon, { color: theme.colors.blue600 }), superPrevIcon: null, format: format, allowClear: allowClearProp, showToday: showToday, locale: locale, onChange: handleChange, onOpenChange: handleOpenChange })))));
    });
    return Object.assign(BaseDatePicker, {
        displayName: 'DatePicker',
        Trigger,
    });
};
createPicker();

export { createPicker };
