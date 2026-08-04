import React from 'react';

const useBoolean = (initialState = false) => {
    const [value, setValue] = React.useState(initialState);
    const setter = React.useCallback((value) => {
        if (typeof value === 'boolean') {
            setValue(value);
            return;
        }
        setValue(prev => !prev);
    }, []);
    return [value, setter];
};

export { useBoolean };
