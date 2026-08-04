'use strict';

var React = require('react');
var groupBy = require('lodash/groupBy');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);
var groupBy__default = /*#__PURE__*/_interopDefault(groupBy);

/**
 * @returns tuple `[SorterConfig]`
 * @description Groups `SorterConfig` by `id` and returns single `SorterConfig` by the given unique `id`
 */
const useSorter = (sorters, 
/**
 * @description `Column` id
 */
id) => {
    const sorter = React__default["default"].useMemo(() => groupBy__default["default"](sorters, 'id')[id] || [], [sorters, id]);
    return sorter;
};

exports.useSorter = useSorter;
