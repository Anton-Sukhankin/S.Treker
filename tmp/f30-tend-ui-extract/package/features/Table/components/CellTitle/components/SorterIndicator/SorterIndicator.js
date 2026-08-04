import React from 'react';
import { ArrowUp } from '@10d/tend-ui-icons/ArrowUp';
import { ArrowDown } from '@10d/tend-ui-icons/ArrowDown';
import { useTableForm } from '../../../../hooks/useTableForm.js';
import { Form } from '../../../../../../components/Form/Form.js';
import { useScopedSorters } from '../../../../hooks/useScopedSorters.js';
import { useSorter } from '../../../../hooks/useSorter.js';
import { useTableSorters } from '../../../../hooks/useTableSorters.js';
import { useTableValue } from '../../../../hooks/useTableValue.js';
import { useTableDefaultValue } from '../../../../hooks/useTableDefaultValue.js';

const SorterIndicator = ({ id }) => {
    var _a, _b;
    const { form } = useTableForm();
    const [sorter] = useScopedSorters(useSorter(useTableSorters().sorters, id));
    const { sorter: defaultSorterValue } = useTableDefaultValue(id);
    const { sorter: _sorter } = useTableValue(id);
    const value = (_b = (_a = Form.useWatch(sorter.name, form)) !== null && _a !== void 0 ? _a : defaultSorterValue) !== null && _b !== void 0 ? _b : _sorter;
    const isAscending = value === 'ascend';
    const isDescending = value === 'descend';
    if (isAscending)
        return React.createElement(ArrowUp, { color: 'gray500', size: 16 });
    if (isDescending)
        return React.createElement(ArrowDown, { color: 'gray500', size: 16 });
    return null;
};
SorterIndicator.displayName = 'Table.CellTitle.SorterIndicator';

export { SorterIndicator };
