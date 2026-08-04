import React from 'react';
import { FilterAlt } from '@10d/tend-ui-icons/FilterAlt';
import { useTableForm } from '../../../../hooks/useTableForm.js';
import { Form } from '../../../../../../components/Form/Form.js';
import { useScopedFilters } from '../../../../hooks/useScopedFilters.js';
import { useFilter } from '../../../../hooks/useFilter.js';
import { useTableFilters } from '../../../../hooks/useTableFilters.js';
import { useTableValue } from '../../../../hooks/useTableValue.js';
import { useTableDefaultValue } from '../../../../hooks/useTableDefaultValue.js';

const FilterIndicator = ({ id }) => {
    var _a, _b;
    const { form } = useTableForm();
    const [filter] = useScopedFilters(useFilter(useTableFilters().filters, id));
    const { filter: defaultFilterValue } = useTableDefaultValue(id);
    const { filter: _filter } = useTableValue(id);
    const value = (_b = (_a = Form.useWatch(filter.name, form)) !== null && _a !== void 0 ? _a : defaultFilterValue) !== null && _b !== void 0 ? _b : _filter;
    const isShown = Array.isArray(value) ? value.length > 0 : !!value;
    if (!isShown)
        return null;
    return React.createElement(FilterAlt, { size: 16, color: 'blue600' });
};
FilterIndicator.displayName = 'Table.CellTitle.FilterIndicator';

export { FilterIndicator };
