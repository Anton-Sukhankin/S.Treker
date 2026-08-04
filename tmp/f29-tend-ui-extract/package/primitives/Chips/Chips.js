import { __rest } from 'tslib';
import React from 'react';
import { INTERNAL_TendUILogger } from '@10d/tend-ui-utils';
import { Root } from './styled.js';
import { Chip } from './Chip/Chip.js';

/**
 * @deprecated Компонент устарел и больше не поддерживается
 * Используйте `Chips` из пакета `@10d/tend-ui-primitives`
 */
const Chips = React.forwardRef((_a, ref) => {
    var { value, options, onChange } = _a, props = __rest(_a, ["value", "options", "onChange"]);
    if (process.env.NODE_ENV === 'development') {
        INTERNAL_TendUILogger.warning([
            '<Chips /> из пакета "@10d/tend-ui" устарел и больше не поддерживается.',
            '',
            'Используйте <Chips /> из пакета "@10d/tend-ui-primitives"',
        ]);
    }
    const [_value, _setValue] = React.useState([]);
    React.useEffect(() => {
        if (!value)
            return;
        _setValue(value);
    }, [value]);
    const handleClick = React.useCallback((payload) => {
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
    const _options = React.useMemo(() => {
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
    return (React.createElement(Root, Object.assign({ "data-testid": 'tend-ui-chips' }, props, { ref: ref }), _options.map(option => (React.createElement(Chip, { key: option.value, checked: option.checked, value: option.value, label: option.label, onClick: handleClick })))));
});
Chips.displayName = 'Chips';

export { Chips };
