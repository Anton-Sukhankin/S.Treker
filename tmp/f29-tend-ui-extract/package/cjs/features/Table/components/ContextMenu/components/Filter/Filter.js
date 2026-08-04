'use strict';

var React = require('react');
var FormName = require('../../../../consts/FormName.js');
var useTableForm = require('../../../../hooks/useTableForm.js');
var useTableFilters = require('../../../../hooks/useTableFilters.js');
var useFilter = require('../../../../hooks/useFilter.js');
var useScopedFilters = require('../../../../hooks/useScopedFilters.js');
var Form = require('../../../../../../components/Form/Form.js');
var Filters = require('../../../../../../components/Filters/Filters.js');
var ColumnContext = require('../../contexts/ColumnContext.js');
var ResetButton = require('./components/ResetButton/ResetButton.js');
var Header = require('./components/Header/Header.js');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

const Filter = () => {
    const column = ColumnContext.useColumnContext();
    const { form } = useTableForm.useTableForm();
    const { clear, filters } = useTableFilters.useTableFilters();
    const [filter] = useScopedFilters.useScopedFilters(useFilter.useFilter(filters, column.id));
    if (!filter)
        return null;
    return (React__default["default"].createElement(Form.Form, { component: false, form: form, name: FormName.FormName.Filter },
        React__default["default"].createElement(Form.Form.Item, { noStyle: true, name: filter.name },
            React__default["default"].createElement(Filters.FilterPicker, Object.assign({ config: filter }, filter.component))),
        React__default["default"].createElement(ResetButton.ResetButton, { onClick: () => {
                clear(filter.name);
            } })));
};
Filter.displayName = 'Table.ContextMenu.Filter';
Filter.Header = Header.Header;

exports.Filter = Filter;
