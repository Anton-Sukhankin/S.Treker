import React from 'react';
import { FormName } from '../../../../consts/FormName.js';
import { useTableForm } from '../../../../hooks/useTableForm.js';
import { useTableFilters } from '../../../../hooks/useTableFilters.js';
import { useFilter } from '../../../../hooks/useFilter.js';
import { useScopedFilters } from '../../../../hooks/useScopedFilters.js';
import { Form } from '../../../../../../components/Form/Form.js';
import { FilterPicker } from '../../../../../../components/Filters/Filters.js';
import { useColumnContext } from '../../contexts/ColumnContext.js';
import { ResetButton } from './components/ResetButton/ResetButton.js';
import { Header } from './components/Header/Header.js';

const Filter = () => {
    const column = useColumnContext();
    const { form } = useTableForm();
    const { clear, filters } = useTableFilters();
    const [filter] = useScopedFilters(useFilter(filters, column.id));
    if (!filter)
        return null;
    return (React.createElement(Form, { component: false, form: form, name: FormName.Filter },
        React.createElement(Form.Item, { noStyle: true, name: filter.name },
            React.createElement(FilterPicker, Object.assign({ config: filter }, filter.component))),
        React.createElement(ResetButton, { onClick: () => {
                clear(filter.name);
            } })));
};
Filter.displayName = 'Table.ContextMenu.Filter';
Filter.Header = Header;

export { Filter };
