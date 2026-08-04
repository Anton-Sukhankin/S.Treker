import React from 'react';
import { Form } from '../../Form/Form.js';

const useFilterCounter = (name) => {
    const form = Form.useFormInstance();
    const value = Form.useWatch(name, form);
    return React.useMemo(() => {
        if (!value)
            return;
        if (Array.isArray(value))
            return value.length;
        return 1;
    }, [value]);
};

export { useFilterCounter };
