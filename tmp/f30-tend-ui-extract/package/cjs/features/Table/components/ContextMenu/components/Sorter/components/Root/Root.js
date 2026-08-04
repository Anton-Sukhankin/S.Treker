'use strict';

var React = require('react');
var Form = require('../../../../../../../../components/Form/Form.js');
var useTableForm = require('../../../../../../hooks/useTableForm.js');
var useScopedSorters = require('../../../../../../hooks/useScopedSorters.js');
var FormName = require('../../../../../../consts/FormName.js');
var useSorter = require('../../../../../../hooks/useSorter.js');
var useTableSorters = require('../../../../../../hooks/useTableSorters.js');
var SorterContext = require('../../contexts/SorterContext.js');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

const Root = ({ column, children, }) => {
    const { form } = useTableForm.useTableForm();
    const { sorters } = useTableSorters.useTableSorters();
    const [sorter] = useScopedSorters.useScopedSorters(useSorter.useSorter(sorters, column.id));
    const value = React__default["default"].useMemo(() => sorter, [sorter]);
    if (!sorter)
        return null;
    return (React__default["default"].createElement(SorterContext.SorterContext, { value: value },
        React__default["default"].createElement(Form.Form, { component: false, form: form, name: FormName.FormName.Sorter },
            React__default["default"].createElement(Form.Form.Item, { noStyle: true, name: sorter.name }, children))));
};
Root.displayName = 'Table.ContextMenu.Sorter.Root';

exports.Root = Root;
