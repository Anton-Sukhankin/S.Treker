import React from 'react';
import { isBoolean } from '@10d/tend-ui-utils/isBoolean';

const useDisabled = (props, values) => {
    const disabled = React.useMemo(() => {
        if (isBoolean(props.disabled))
            return props.disabled;
        if (!Array.isArray(props.config.requires))
            return;
        if (!values)
            return;
        // Updating disabled state
        const disabled = props.config.requires.some(filterName => {
            const key = filterName;
            const hasValue = values[key];
            return !hasValue;
        });
        return disabled;
    }, [props.config.requires, props.disabled, values]);
    return disabled;
};

export { useDisabled };
