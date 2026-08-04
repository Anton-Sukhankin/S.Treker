import React from 'react';
import { Filters as Filters$1 } from '../../../../components/Filters/Filters.js';
import { useScopedFilters } from '../../hooks/useScopedFilters.js';
import { useTableFilters } from '../../hooks/useTableFilters.js';
import { useTableForm } from '../../hooks/useTableForm.js';
import { FormName } from '../../consts/FormName.js';
import { Scope } from '../../consts/Scope.js';

const Filters = (props) => {
    const { form } = useTableForm();
    const { reset, filters, clear } = useTableFilters();
    const scopedFilters = useScopedFilters(filters);
    return (React.createElement(Filters$1, Object.assign({ debounce: false }, props, { form: form, name: FormName.Filters, filters: scopedFilters, onFiltersReset: reset, onFilterReset: clear, resetAllButtonProps: React.useMemo(() => ({
            onClick: () => {
                form.resetFields([Scope.Filters]);
                reset();
            },
        }), [form, reset]) })));
};
Filters.displayName = 'Table.Filters';

export { Filters };
