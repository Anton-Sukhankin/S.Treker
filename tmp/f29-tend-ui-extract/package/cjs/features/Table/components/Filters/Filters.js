'use strict';

var React = require('react');
var Filters$1 = require('../../../../components/Filters/Filters.js');
var useScopedFilters = require('../../hooks/useScopedFilters.js');
var useTableFilters = require('../../hooks/useTableFilters.js');
var useTableForm = require('../../hooks/useTableForm.js');
var FormName = require('../../consts/FormName.js');
var Scope = require('../../consts/Scope.js');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

const Filters = (props) => {
    const { form } = useTableForm.useTableForm();
    const { reset, filters, clear } = useTableFilters.useTableFilters();
    const scopedFilters = useScopedFilters.useScopedFilters(filters);
    return (React__default["default"].createElement(Filters$1.Filters, Object.assign({ debounce: false }, props, { form: form, name: FormName.FormName.Filters, filters: scopedFilters, onFiltersReset: reset, onFilterReset: clear, resetAllButtonProps: React__default["default"].useMemo(() => ({
            onClick: () => {
                form.resetFields([Scope.Scope.Filters]);
                reset();
            },
        }), [form, reset]) })));
};
Filters.displayName = 'Table.Filters';

exports.Filters = Filters;
