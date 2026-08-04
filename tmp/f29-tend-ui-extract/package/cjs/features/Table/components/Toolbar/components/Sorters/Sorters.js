'use strict';

var React = require('react');
var Dropdown = require('../../../../../../primitives/Dropdown/Dropdown.js');
var useBoolean = require('../../../../../../hooks/useBoolean/useBoolean.js');
var useScopedSorters = require('../../../../hooks/useScopedSorters.js');
var useTableForm = require('../../../../hooks/useTableForm.js');
var FormName = require('../../../../consts/FormName.js');
var Form = require('../../../../../../components/Form/Form.js');
var List = require('../../../../../../ui/List/List.js');
var useTableSorters = require('../../../../hooks/useTableSorters.js');
var useTableColumns = require('../../../../hooks/useTableColumns.js');
var useLabeledSorters = require('../../../../hooks/useLabeledSorters.js');
var SortersButton = require('../SortersButton/SortersButton.js');
var ToggleSorter = require('./ToggleSorter/ToggleSorter.js');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

const overlayStyle = {
    minWidth: 245,
};
const Sorters = ({ open }) => {
    const [selected, onOpenChange] = useBoolean.useBoolean();
    const { form } = useTableForm.useTableForm();
    const { columns } = useTableColumns.useTableColumns();
    const { sorters } = useTableSorters.useTableSorters();
    const labeled = useScopedSorters.useScopedSorters(useLabeledSorters.useLabeledSorters(sorters, columns));
    return (React__default["default"].createElement(Dropdown.Dropdown, { open: open, trigger: ['click'], onOpenChange: onOpenChange, overlayStyle: overlayStyle, content: React__default["default"].createElement(Form.Form, { component: false, form: form, name: FormName.FormName.Sorters },
            React__default["default"].createElement(List.List, null, labeled.map(sorter => (React__default["default"].createElement(Form.Form.Item, { noStyle: true, key: sorter.key, name: sorter.name },
                React__default["default"].createElement(ToggleSorter.ToggleSorter, { disabled: sorter.disabled }, sorter.label)))))) },
        React__default["default"].createElement(SortersButton.SortersButton, { selected: selected })));
};
Sorters.displayName = 'Table.Toolbar.Sorters';

exports.Sorters = Sorters;
