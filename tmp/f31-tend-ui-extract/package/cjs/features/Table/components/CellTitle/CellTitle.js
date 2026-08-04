'use strict';

var React = require('react');
var tendUiGrid = require('@10d/tend-ui-grid');
var useScopedFilters = require('../../hooks/useScopedFilters.js');
var useTableSorters = require('../../hooks/useTableSorters.js');
var useScopedSorters = require('../../hooks/useScopedSorters.js');
var useSorter = require('../../hooks/useSorter.js');
var useFilter = require('../../hooks/useFilter.js');
var useTableFilters = require('../../hooks/useTableFilters.js');
var FilterIndicator = require('./components/FilterIndicator/FilterIndicator.js');
var SorterIndicator = require('./components/SorterIndicator/SorterIndicator.js');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

const BaseCellTitle = ({ id, children }) => {
    const [sorter] = useScopedSorters.useScopedSorters(useSorter.useSorter(useTableSorters.useTableSorters().sorters, id));
    const [filter] = useScopedFilters.useScopedFilters(useFilter.useFilter(useTableFilters.useTableFilters().filters, id));
    if (!sorter && !filter)
        return React__default["default"].createElement(React__default["default"].Fragment, null, children);
    return (React__default["default"].createElement(tendUiGrid.Box, { "$display": 'flex', "$alignItems": 'center', "$gap": 4 },
        children,
        filter && React__default["default"].createElement(FilterIndicator.FilterIndicator, { id: id }),
        sorter && React__default["default"].createElement(SorterIndicator.SorterIndicator, { id: id })));
};
const CellTitle = Object.assign(BaseCellTitle, {
    displayName: 'Table.CellTitle',
    FilterIndicator: FilterIndicator.FilterIndicator,
    SorterIndicator: SorterIndicator.SorterIndicator,
});

exports.CellTitle = CellTitle;
