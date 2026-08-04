'use strict';

var React = require('react');
var groupBy = require('lodash/groupBy');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);
var groupBy__default = /*#__PURE__*/_interopDefault(groupBy);

/**
 * @returns tuple `[Filter]` or `[]`
 * @description Groups `filters` by `id` and returns single `filter` by the given unique `id`
 */
const useFilter = (filters, id) => {
    const config = React__default["default"].useMemo(() => groupBy__default["default"](filters, 'id')[id] || [], [filters, id]);
    return config;
};

exports.useFilter = useFilter;
