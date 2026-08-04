import { __rest } from 'tslib';
import React from 'react';
import dayjs from 'dayjs';
import { Select } from '../Select/Select.js';
import { useTimeOptions } from './hooks.js';

const TimeSelect = (_a) => {
    var { virtual = true, onChange, from, to, step } = _a, props = __rest(_a, ["virtual", "onChange", "from", "to", "step"]);
    const options = useTimeOptions({ from, to, step });
    const handleChange = React.useCallback((value) => {
        const [hour = 0, minute = 0, second = 0] = value.split(':');
        const time = dayjs()
            .set('hour', Number(hour))
            .set('minute', Number(minute))
            .set('second', Number(second));
        onChange === null || onChange === void 0 ? void 0 : onChange(time);
    }, [onChange]);
    return (React.createElement(Select, Object.assign({ "data-testid": 'tend-ui-timeselect', virtual: virtual, options: options }, props, { onChange: handleChange })));
};
TimeSelect.displayName = 'TimeSelect';

export { TimeSelect };
