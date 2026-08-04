'use strict';

var React = require('react');
var ArrowUp = require('@10d/tend-ui-icons/ArrowUp');
var ArrowDown = require('@10d/tend-ui-icons/ArrowDown');
var useTableForm = require('../../../../hooks/useTableForm.js');
var Form = require('../../../../../../components/Form/Form.js');
var useScopedSorters = require('../../../../hooks/useScopedSorters.js');
var useSorter = require('../../../../hooks/useSorter.js');
var useTableSorters = require('../../../../hooks/useTableSorters.js');
var useTableValue = require('../../../../hooks/useTableValue.js');
var useTableDefaultValue = require('../../../../hooks/useTableDefaultValue.js');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

const SorterIndicator = ({ id }) => {
    var _a, _b;
    const { form } = useTableForm.useTableForm();
    const [sorter] = useScopedSorters.useScopedSorters(useSorter.useSorter(useTableSorters.useTableSorters().sorters, id));
    const { sorter: defaultSorterValue } = useTableDefaultValue.useTableDefaultValue(id);
    const { sorter: _sorter } = useTableValue.useTableValue(id);
    const value = (_b = (_a = Form.Form.useWatch(sorter.name, form)) !== null && _a !== void 0 ? _a : defaultSorterValue) !== null && _b !== void 0 ? _b : _sorter;
    const isAscending = value === 'ascend';
    const isDescending = value === 'descend';
    if (isAscending)
        return React__default["default"].createElement(ArrowUp.ArrowUp, { color: 'gray500', size: 16 });
    if (isDescending)
        return React__default["default"].createElement(ArrowDown.ArrowDown, { color: 'gray500', size: 16 });
    return null;
};
SorterIndicator.displayName = 'Table.CellTitle.SorterIndicator';

exports.SorterIndicator = SorterIndicator;
