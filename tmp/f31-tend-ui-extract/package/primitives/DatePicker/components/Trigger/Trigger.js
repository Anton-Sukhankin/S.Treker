import { __rest } from 'tslib';
import React from 'react';
import { isString } from 'lodash';
import { Button } from '@10d/tend-ui-primitives';
import { useDatePickerContext } from '../../contexts/DatePickerContext.js';
import { useDatePickerVisibilityContext } from '../../contexts/DatePickerVisibilityContext.js';

const Trigger = (_a) => {
    var { component: Component, onClick } = _a, props = __rest(_a, ["component", "onClick"]);
    const context = useDatePickerContext();
    const visibilityContext = useDatePickerVisibilityContext();
    const isInvalid = !!(context === null || context === void 0 ? void 0 : context['aria-invalid']);
    const __value = (context === null || context === void 0 ? void 0 : context.value) || (context === null || context === void 0 ? void 0 : context._value);
    const handleClick = React.useCallback((...parameters) => {
        var _a;
        (_a = visibilityContext === null || visibilityContext === void 0 ? void 0 : visibilityContext.setOpen) === null || _a === void 0 ? void 0 : _a.call(visibilityContext, open => !open);
        onClick === null || onClick === void 0 ? void 0 : onClick(...parameters);
    }, [onClick, visibilityContext]);
    const value = React.useMemo(() => {
        if (!__value)
            return context === null || context === void 0 ? void 0 : context.placeholder;
        if (isString(context === null || context === void 0 ? void 0 : context.format))
            return __value === null || __value === void 0 ? void 0 : __value.format(context.format);
    }, [context === null || context === void 0 ? void 0 : context.format, context === null || context === void 0 ? void 0 : context.placeholder, __value]);
    React.useEffect(() => {
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
        return (React.createElement(Button, Object.assign({ "data-testid": 'tend-ui-date-picker-trigger', variant: 'link', preset: isInvalid ? 'danger' : undefined }, props, { fullWidth: true, onClick: handleClick }), value));
    return React.createElement(Component, { onClick: handleClick }, value);
};
Trigger.displayName = 'DatePicker.Trigger';

export { Trigger };
