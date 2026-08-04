'use strict';

var tslib = require('tslib');
var React = require('react');
var tendUiUtils = require('@10d/tend-ui-utils');
var tendUiStyling = require('@10d/tend-ui-styling');
var CalendarMonth = require('@10d/tend-ui-icons/CalendarMonth');
var useSize = require('../../hooks/useSize.js');
var useAllowClear = require('../../hooks/useAllowClear.js');
var tendUiTheme = require('@10d/tend-ui-theme');
var useDatePickerLocale = require('../../hooks/useDatePickerLocale.js');
var Trigger = require('./components/Trigger/Trigger.js');
var styled$2 = require('./components/NextIcon/styled.js');
var styled$1 = require('./components/PrevIcon/styled.js');
var styled = require('./styled.js');
var DatePickerContext = require('./contexts/DatePickerContext.js');
var DatePickerVisibilityContext = require('./contexts/DatePickerVisibilityContext.js');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

const createPicker = () => {
    const BaseDatePicker = React__default["default"].forwardRef((_a, ref) => {
        var { fullWidth = false, showToday = false, allowClear = true, open, format = 'DD.MM.YYYY', clearIconTooltip, width = '256px', onChange, onOpenChange, suffixIcon = React__default["default"].createElement(CalendarMonth.CalendarMonth, null), size = 'medium' } = _a, props = tslib.__rest(_a, ["fullWidth", "showToday", "allowClear", "open", "format", "clearIconTooltip", "width", "onChange", "onOpenChange", "suffixIcon", "size"]);
        const [_open, _setOpen] = React__default["default"].useState(open !== null && open !== void 0 ? open : false);
        const [_value, _setValue] = React__default["default"].useState(props.value);
        const __open = tendUiUtils.isUndefined(open) ? _open : open;
        const theme = tendUiTheme.useTheme();
        const _size = useSize.useSize(size);
        const allowClearProp = useAllowClear.useAllowClear({ allowClear, clearIconTooltip });
        const locale = useDatePickerLocale.useDatePickerLocale(props.locale);
        const handleChange = React__default["default"].useCallback((...parameters) => {
            onChange === null || onChange === void 0 ? void 0 : onChange(...parameters);
            _setValue(parameters[0]);
        }, [onChange]);
        const handleOpenChange = React__default["default"].useCallback(open => {
            onOpenChange === null || onOpenChange === void 0 ? void 0 : onOpenChange(open);
            _setOpen === null || _setOpen === void 0 ? void 0 : _setOpen(open);
        }, [onOpenChange]);
        const _b = tendUiStyling.extractMarginProps(props), { rest } = _b, margins = tslib.__rest(_b, ["rest"]);
        const height = { large: '40px', medium: '32px', small: '24px' }[size];
        return (React__default["default"].createElement(DatePickerVisibilityContext.DatePickerVisibilityContext.Provider, { value: React__default["default"].useMemo(() => ({ open: _open, setOpen: _setOpen }), [_open]) },
            React__default["default"].createElement(DatePickerContext.DatePickerContext.Provider, { value: React__default["default"].useMemo(() => (Object.assign(Object.assign({ fullWidth,
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
                React__default["default"].createElement(styled.Root, Object.assign({ "data-testid": 'tend-ui-date-picker' }, rest, { ref: ref, "$fullWidth": fullWidth, "$width": width, "$height": height }, margins, { open: __open, size: _size, suffixIcon: suffixIcon, nextIcon: React__default["default"].createElement(styled$2.NextIcon, { color: theme.colors.blue600 }), superNextIcon: null, prevIcon: React__default["default"].createElement(styled$1.PrevIcon, { color: theme.colors.blue600 }), superPrevIcon: null, format: format, allowClear: allowClearProp, showToday: showToday, locale: locale, onChange: handleChange, onOpenChange: handleOpenChange })))));
    });
    return Object.assign(BaseDatePicker, {
        displayName: 'DatePicker',
        Trigger: Trigger.Trigger,
    });
};
createPicker();

exports.createPicker = createPicker;
