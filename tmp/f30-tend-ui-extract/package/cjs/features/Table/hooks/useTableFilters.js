'use strict';

var React = require('react');
var FiltersContext = require('../contexts/FiltersContext.js');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

const useTableFilters = () => {
    const { filters, clear, reset } = FiltersContext.useFiltersContext();
    const api = React__default["default"].useMemo(() => ({
        filters,
        clear,
        reset,
    }), [clear, filters, reset]);
    return api;
};

exports.useTableFilters = useTableFilters;
