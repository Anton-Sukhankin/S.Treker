'use strict';

var tslib = require('tslib');
var React = require('react');
var lodash = require('lodash');
var tendUiPrimitives = require('@10d/tend-ui-primitives');
var DatePickerContext = require('../../contexts/DatePickerContext.js');
var DatePickerVisibilityContext = require('../../contexts/DatePickerVisibilityContext.js');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

const Trigger = (_a) => {
    var { component: Component, onClick } = _a, props = tslib.__rest(_a, ["component", "onClick"]);
    const context = DatePickerContext.useDatePickerContext();
    const visibilityContext = DatePickerVisibilityContext.useDatePickerVisibilityContext();
    const isInvalid = !!(context === null || context === void 0 ? void 0 : context['aria-invalid']);
    const __value = (context === null || context === void 0 ? void 0 : context.value) || (context === null || context === void 0 ? void 0 : context._value);
    const handleClick = React__default["default"].useCallback((...parameters) => {
        var _a;
        (_a = visibilityContext === null || visibilityContext === void 0 ? void 0 : visibilityContext.setOpen) === null || _a === void 0 ? void 0 : _a.call(visibilityContext, open => !open);
        onClick === null || onClick === void 0 ? void 0 : onClick(...parameters);
    }, [onClick, visibilityContext]);
    const value = React__default["default"].useMemo(() => {
        if (!__value)
            return context === null || context === void 0 ? void 0 : context.placeholder;
        if (lodash.isString(context === null || context === void 0 ? void 0 : context.format))
            return __value === null || __value === void 0 ? void 0 : __value.format(context.format);
    }, [context === null || context === void 0 ? void 0 : context.format, context === null || context === void 0 ? void 0 : context.placeholder, __value]);
    React__default["default"].useEffect(() => {
        function onEscape(event) {
            var _a;
            if (event.key !== 'Escape')
                return;
            (_a = visibilityContext === null || visibilityContext === void 0 ? void 0 : visibilityContext.setOpen) === null || _a === void 0 ? void 0 : _a.call(visibilityContext, false);
        }
        window.addEventListener('keydown', onEscape);
        return () => {
            window.removeEventListener('keydown', onEscape);
        };
    }, [visibilityContext]);
    if (!Component)
        return (React__default["default"].createElement(tendUiPrimitives.Button, Object.assign({ "data-testid": 'tend-ui-date-picker-trigger', variant: 'link', preset: isInvalid ? 'danger' : undefined }, props, { fullWidth: true, onClick: handleClick }), value));
    return React__default["default"].createElement(Component, { onClick: handleClick }, value);
};
Trigger.displayName = 'DatePicker.Trigger';

exports.Trigger = Trigger;
