'use strict';

var React = require('react');
var groupBy = require('lodash/groupBy');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);
var groupBy__default = /*#__PURE__*/_interopDefault(groupBy);

/**
 * Groups `column` by `id` and returns single `column` by the given unique `id`
 * @returns tuple `[Column]`
 * @param columns - колонки
 */
const useColumn = (columns, 
/**
 * `Column` id
 */
id) => {
    const column = React__default["default"].useMemo(() => groupBy__default["default"](columns, 'id')[id] || [], [columns, id]);
    return column;
};

exports.useColumn = useColumn;
