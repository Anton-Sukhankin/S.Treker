import React from 'react';

const MINUTE_STEP = 30;
const HOUR_STEP = 1;
const FROM = 0;
const TO = 24;
const useTimeOptions = (options) => {
    var _a, _b, _c, _d;
    const { from = FROM, to = TO } = options || {};
    const hourStep = (_b = (_a = options === null || options === void 0 ? void 0 : options.step) === null || _a === void 0 ? void 0 : _a.hour) !== null && _b !== void 0 ? _b : HOUR_STEP;
    const minuteStep = (_d = (_c = options === null || options === void 0 ? void 0 : options.step) === null || _c === void 0 ? void 0 : _c.minute) !== null && _d !== void 0 ? _d : MINUTE_STEP;
    return React.useMemo(() => Array.from({ length: (to - from) / hourStep }, (_, index) => from + index * hourStep)
        .reduce((acc, hour) => {
        Array.from({ length: 60 / minuteStep }, (_, index) => index * minuteStep).forEach(minute => {
            acc.push([hour, minute]);
        });
        return acc;
    }, [])
        .map(([hour, minute]) => [String(hour).padStart(2, '0'), String(minute).padStart(2, '0')].join(':'))
        .map(interval => ({ value: interval, label: interval })), [from, hourStep, minuteStep, to]);
};

export { useTimeOptions };
