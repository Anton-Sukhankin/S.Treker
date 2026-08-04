import React from 'react';
import { FormName } from '../../../../../../consts/FormName.js';
import { useTableForm } from '../../../../../../hooks/useTableForm.js';
import { useTableFilters } from '../../../../../../hooks/useTableFilters.js';
import { useFilter } from '../../../../../../hooks/useFilter.js';
import { useScopedFilters } from '../../../../../../hooks/useScopedFilters.js';
import { Divider } from '../../../../../../../../ui/Divider/Divider.js';
import { Form } from '../../../../../../../../components/Form/Form.js';

const Root = ({ children, column, }) => {
    const { form } = useTableForm();
    const { filters } = useTableFilters();
    const [filter] = useScopedFilters(useFilter(filters, column.id));
    if (!filter)
        return null;
    return (React.createElement(React.Fragment, null,
        React.createElement(Form, { component: false, form: form, name: FormName.Filter }, children),
        React.createElement(Divider, { margin: '0 -16px', padding: '0 16px' })));
};

export { Root };
