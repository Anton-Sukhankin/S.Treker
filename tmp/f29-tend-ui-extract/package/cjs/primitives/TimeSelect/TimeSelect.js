'use strict';

var tslib = require('tslib');
var React = require('react');
var dayjs = require('dayjs');
var Select = require('../Select/Select.js');
var hooks = require('./hooks.js');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);
var dayjs__default = /*#__PURE__*/_interopDefault(dayjs);

const TimeSelect = (_a) => {
    var { virtual = true, onChange, from, to, step } = _a, props = tslib.__rest(_a, ["virtual", "onChange", "from", "to", "step"]);
    const options = hooks.useTimeOptions({ from, to, step });
    const handleChange = React__default["default"].useCallback((value) => {
        const [hour = 0, minute = 0, second = 0] = value.split(':');
        const time = dayjs__default["default"]()
            .set('hour', Number(hour))
            .set('minute', Number(minute))
            .set('second', Number(second));
        onChange === null || onChange === void 0 ? void 0 : onChange(time);
    }, [onChange]);
    return (React__default["default"].createElement(Select.Select, Object.assign({ "data-testid": 'tend-ui-timeselect', virtual: virtual, options: options }, props, { onChange: handleChange })));
};
TimeSelect.displayName = 'TimeSelect';

exports.TimeSelect = TimeSelect;
