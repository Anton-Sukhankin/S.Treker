import { __rest } from 'tslib';
import React from 'react';
import { extractMarginProps } from '@10d/tend-ui-styling';
import { CalendarMonth } from '@10d/tend-ui-icons/CalendarMonth';
import { useSize } from '../../hooks/useSize.js';
import { useAllowClear } from '../../hooks/useAllowClear.js';
import { useTheme } from '@10d/tend-ui-theme';
import { useDatePickerLocale } from '../../hooks/useDatePickerLocale.js';
import { Root, PrevIcon, NextIcon } from './styled.js';

const RangePicker = React.forwardRef((_a, ref) => {
    var { allowClear = true, fullWidth = false, format = 'DD.MM.YYYY', clearIconTooltip, width = '256px', size = 'medium' } = _a, props = __rest(_a, ["allowClear", "fullWidth", "format", "clearIconTooltip", "width", "size"]);
    const theme = useTheme();
    const _size = useSize(size);
    const allowClearProp = useAllowClear({ allowClear, clearIconTooltip });
    const locale = useDatePickerLocale(props.locale);
    const _b = extractMarginProps(props), { rest } = _b, margins = __rest(_b, ["rest"]);
    const height = React.useMemo(() => ({ large: '40px', medium: '32px', small: '24px' }[size]), [size]);
    return (React.createElement(Root, Object.assign({ "data-testid": 'tend-ui-range-picker' }, rest, margins, { ref: ref, "$fullWidth": fullWidth, "$width": width, "$height": height, size: _size, suffixIcon: React.createElement(CalendarMonth, null), nextIcon: React.createElement(NextIcon, { color: theme.colors.blue600 }), superNextIcon: null, prevIcon: React.createElement(PrevIcon, { color: theme.colors.blue600 }), superPrevIcon: null, format: format, allowClear: allowClearProp, locale: locale })));
});
RangePicker.displayName = 'RangePicker';

export { RangePicker };
