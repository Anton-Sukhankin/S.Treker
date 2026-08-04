import React from 'react';
import { ArrowUp } from '@10d/tend-ui-icons/ArrowUp';
import { ArrowDown } from '@10d/tend-ui-icons/ArrowDown';
import { Root } from './styled.js';

const ToggleSorter = ({ disabled, order = ['default', 'ascend', 'descend'], value, children, onChange, }) => {
    const [state, setState] = React.useState(value !== null && value !== void 0 ? value : 'default');
    React.useEffect(() => {
        if (!value)
            return;
        setState(value);
    }, [value]);
    const icon = React.useMemo(() => {
        if (state === 'default')
            return null;
        if (state === 'ascend')
            return React.createElement(ArrowUp, null);
        return React.createElement(ArrowDown, null);
    }, [state]);
    const handleClick = React.useCallback((_, value) => {
        if (!value)
            return;
        const current = order.indexOf(value);
        const idx = (current + 1) % order.length;
        const next = order[idx];
        setState(next);
        onChange === null || onChange === void 0 ? void 0 : onChange(next);
    }, [onChange, order]);
    return (React.createElement(Root, { disabled: disabled, value: state, after: icon, onClick: handleClick }, children));
};

export { ToggleSorter };
