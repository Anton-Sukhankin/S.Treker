'use strict';

var tslib = require('tslib');
var React = require('react');
var tendUiUtils = require('@10d/tend-ui-utils');
var styled = require('./styled.js');
var Chip = require('./Chip/Chip.js');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

/**
 * @deprecated Компонент устарел и больше не поддерживается
 * Используйте `Chips` из пакета `@10d/tend-ui-primitives`
 */
const Chips = React__default["default"].forwardRef((_a, ref) => {
    var { value, options, onChange } = _a, props = tslib.__rest(_a, ["value", "options", "onChange"]);
    if (process.env.NODE_ENV === 'development') {
        tendUiUtils.INTERNAL_TendUILogger.warning([
            '<Chips /> из пакета "@10d/tend-ui" устарел и больше не поддерживается.',
            '',
            'Используйте <Chips /> из пакета "@10d/tend-ui-primitives"',
        ]);
    }
    const [_value, _setValue] = React__default["default"].useState([]);
    React__default["default"].useEffect(() => {
        if (!value)
            return;
        _setValue(value);
    }, [value]);
    const handleClick = React__default["default"].useCallback((payload) => {
        _setValue(prev => {
            if (prev.includes(payload)) {
                const next = prev.filter(prevValue => prevValue !== payload);
                onChange === null || onChange === void 0 ? void 0 : onChange(payload, next);
                return next;
            }
            const next = [...prev, payload];
            onChange === null || onChange === void 0 ? void 0 : onChange(payload, next);
            return next;
        });
    }, [onChange]);
    const _options = React__default["default"].useMemo(() => {
        const checked = value || _value;
        return options.map(option => {
            if (typeof option === 'object')
                return {
                    label: option.label,
                    value: option.value,
                    checked: checked.includes(option.value),
                };
            return {
                label: option,
                value: option,
                checked: checked.includes(option),
            };
        });
    }, [value, _value, options]);
    return (React__default["default"].createElement(styled.Root, Object.assign({ "data-testid": 'tend-ui-chips' }, props, { ref: ref }), _options.map(option => (React__default["default"].createElement(Chip.Chip, { key: option.value, checked: option.checked, value: option.value, label: option.label, onClick: handleClick })))));
});
Chips.displayName = 'Chips';

exports.Chips = Chips;
