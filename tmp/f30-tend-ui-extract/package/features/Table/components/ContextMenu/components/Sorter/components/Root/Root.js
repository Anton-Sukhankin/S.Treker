import React from 'react';
import { Form } from '../../../../../../../../components/Form/Form.js';
import { useTableForm } from '../../../../../../hooks/useTableForm.js';
import { useScopedSorters } from '../../../../../../hooks/useScopedSorters.js';
import { FormName } from '../../../../../../consts/FormName.js';
import { useSorter } from '../../../../../../hooks/useSorter.js';
import { useTableSorters } from '../../../../../../hooks/useTableSorters.js';
import { SorterContext } from '../../contexts/SorterContext.js';

const Root = ({ column, children, }) => {
    const { form } = useTableForm();
    const { sorters } = useTableSorters();
    const [sorter] = useScopedSorters(useSorter(sorters, column.id));
    const value = React.useMemo(() => sorter, [sorter]);
    if (!sorter)
        return null;
    return (React.createElement(SorterContext, { value: value },
        React.createElement(Form, { component: false, form: form, name: FormName.Sorter },
            React.createElement(Form.Item, { noStyle: true, name: sorter.name }, children))));
};
Root.displayName = 'Table.ContextMenu.Sorter.Root';

export { Root };
