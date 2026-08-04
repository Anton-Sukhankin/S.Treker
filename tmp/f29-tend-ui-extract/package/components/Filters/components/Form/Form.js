import React from 'react';
import { Form as Form$1 } from '../../../Form/Form.js';
import { useFiltersContext } from '../../contexts/FiltersContext.js';
import { useFiltersFormProvider } from '../../core/FiltersFormProvider.js';

const Form = ({ children }) => {
    const { name, onFilterValuesChange } = useFiltersContext();
    const model = useFiltersFormProvider('Filters.Form');
    return (React.createElement(Form$1, { "data-testid": 'tend-ui-filters-form', form: model.form, name: name, onValuesChange: onFilterValuesChange }, children));
};
Form.displayName = 'Filters.Form';

export { Form };
