import React from 'react';
import { Dropdown } from '../../../../../../primitives/Dropdown/Dropdown.js';
import { useBoolean } from '../../../../../../hooks/useBoolean/useBoolean.js';
import { useScopedSorters } from '../../../../hooks/useScopedSorters.js';
import { useTableForm } from '../../../../hooks/useTableForm.js';
import { FormName } from '../../../../consts/FormName.js';
import { Form } from '../../../../../../components/Form/Form.js';
import { List } from '../../../../../../ui/List/List.js';
import { useTableSorters } from '../../../../hooks/useTableSorters.js';
import { useTableColumns } from '../../../../hooks/useTableColumns.js';
import { useLabeledSorters } from '../../../../hooks/useLabeledSorters.js';
import { SortersButton } from '../SortersButton/SortersButton.js';
import { ToggleSorter } from './ToggleSorter/ToggleSorter.js';

const overlayStyle = {
    minWidth: 245,
};
const Sorters = ({ open }) => {
    const [selected, onOpenChange] = useBoolean();
    const { form } = useTableForm();
    const { columns } = useTableColumns();
    const { sorters } = useTableSorters();
    const labeled = useScopedSorters(useLabeledSorters(sorters, columns));
    return (React.createElement(Dropdown, { open: open, trigger: ['click'], onOpenChange: onOpenChange, overlayStyle: overlayStyle, content: React.createElement(Form, { component: false, form: form, name: FormName.Sorters },
            React.createElement(List, null, labeled.map(sorter => (React.createElement(Form.Item, { noStyle: true, key: sorter.key, name: sorter.name },
                React.createElement(ToggleSorter, { disabled: sorter.disabled }, sorter.label)))))) },
        React.createElement(SortersButton, { selected: selected })));
};
Sorters.displayName = 'Table.Toolbar.Sorters';

export { Sorters };
