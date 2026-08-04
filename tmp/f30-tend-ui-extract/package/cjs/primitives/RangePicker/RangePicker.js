'use strict';

var tslib = require('tslib');
var React = require('react');
var tendUiStyling = require('@10d/tend-ui-styling');
var CalendarMonth = require('@10d/tend-ui-icons/CalendarMonth');
var useSize = require('../../hooks/useSize.js');
var useAllowClear = require('../../hooks/useAllowClear.js');
var tendUiTheme = require('@10d/tend-ui-theme');
var useDatePickerLocale = require('../../hooks/useDatePickerLocale.js');
var styled = require('./styled.js');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

const RangePicker = React__default["default"].forwardRef((_a, ref) => {
    var { allowClear = true, fullWidth = false, format = 'DD.MM.YYYY', clearIconTooltip, width = '256px', size = 'medium' } = _a, props = tslib.__rest(_a, ["allowClear", "fullWidth", "format", "clearIconTooltip", "width", "size"]);
    const theme = tendUiTheme.useTheme();
    const _size = useSize.useSize(size);
    const allowClearProp = useAllowClear.useAllowClear({ allowClear, clearIconTooltip });
    const locale = useDatePickerLocale.useDatePickerLocale(props.locale);
    const _b = tendUiStyling.extractMarginProps(props), { rest } = _b, margins = tslib.__rest(_b, ["rest"]);
    const height = React__default["default"].useMemo(() => ({ large: '40px', medium: '32px', small: '24px' }[size]), [size]);
    return (React__default["default"].createElement(styled.Root, Object.assign({ "data-testid": 'tend-ui-range-picker' }, rest, margins, { ref: ref, "$fullWidth": fullWidth, "$width": width, "$height": height, size: _size, suffixIcon: React__default["default"].createElement(CalendarMonth.CalendarMonth, null), nextIcon: React__default["default"].createElement(styled.NextIcon, { color: theme.colors.blue600 }), superNextIcon: null, prevIcon: React__default["default"].createElement(styled.PrevIcon, { color: theme.colors.blue600 }), superPrevIcon: null, format: format, allowClear: allowClearProp, locale: locale })));
});
RangePicker.displayName = 'RangePicker';

exports.RangePicker = RangePicker;
