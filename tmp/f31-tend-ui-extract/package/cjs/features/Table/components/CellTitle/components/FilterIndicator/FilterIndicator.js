'use strict';

var React = require('react');
var FilterAlt = require('@10d/tend-ui-icons/FilterAlt');
var useTableForm = require('../../../../hooks/useTableForm.js');
var Form = require('../../../../../../components/Form/Form.js');
var useScopedFilters = require('../../../../hooks/useScopedFilters.js');
var useFilter = require('../../../../hooks/useFilter.js');
var useTableFilters = require('../../../../hooks/useTableFilters.js');
var useTableValue = require('../../../../hooks/useTableValue.js');
var useTableDefaultValue = require('../../../../hooks/useTableDefaultValue.js');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

const FilterIndicator = ({ id }) => {
    var _a, _b;
    const { form } = useTableForm.useTableForm();
    const [filter] = useScopedFilters.useScopedFilters(useFilter.useFilter(useTableFilters.useTableFilters().filters, id));
    const { filter: defaultFilterValue } = useTableDefaultValue.useTableDefaultValue(id);
    const { filter: _filter } = useTableValue.useTableValue(id);
    const value = (_b = (_a = Form.Form.useWatch(filter.name, form)) !== null && _a !== void 0 ? _a : defaultFilterValue) !== null && _b !== void 0 ? _b : _filter;
    const isShown = Array.isArray(value) ? value.length > 0 : !!value;
    if (!isShown)
        return null;
    return React__default["default"].createElement(FilterAlt.FilterAlt, { size: 16, color: 'blue600' });
};
FilterIndicator.displayName = 'Table.CellTitle.FilterIndicator';

exports.FilterIndicator = FilterIndicator;
