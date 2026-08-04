import React from 'react';
import { useFormContext } from '../contexts/FormContext.js';

/**
 * @deprecated Устарело. Не использовать в продакшене
 */
const useTableForm = () => {
    const { form } = useFormContext();
    const model = React.useMemo(() => ({ form }), [form]);
    return model;
};

export { useTableForm };
