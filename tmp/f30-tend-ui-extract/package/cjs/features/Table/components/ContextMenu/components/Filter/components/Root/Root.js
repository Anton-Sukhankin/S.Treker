'use strict';

var React = require('react');
var FormName = require('../../../../../../consts/FormName.js');
var useTableForm = require('../../../../../../hooks/useTableForm.js');
var useTableFilters = require('../../../../../../hooks/useTableFilters.js');
var useFilter = require('../../../../../../hooks/useFilter.js');
var useScopedFilters = require('../../../../../../hooks/useScopedFilters.js');
var Divider = require('../../../../../../../../ui/Divider/Divider.js');
var Form = require('../../../../../../../../components/Form/Form.js');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

const Root = ({ children, column, }) => {
    const { form } = useTableForm.useTableForm();
    const { filters } = useTableFilters.useTableFilters();
    const [filter] = useScopedFilters.useScopedFilters(useFilter.useFilter(filters, column.id));
    if (!filter)
        return null;
    return (React__default["default"].createElement(React__default["default"].Fragment, null,
        React__default["default"].createElement(Form.Form, { component: false, form: form, name: FormName.FormName.Filter }, children),
        React__default["default"].createElement(Divider.Divider, { margin: '0 -16px', padding: '0 16px' })));
};

exports.Root = Root;
