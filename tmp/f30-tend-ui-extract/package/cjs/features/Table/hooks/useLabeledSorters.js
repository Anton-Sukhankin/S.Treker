'use strict';

var React = require('react');
var groupBy = require('lodash/groupBy');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);
var groupBy__default = /*#__PURE__*/_interopDefault(groupBy);

const useLabeledSorters = (sorters, columns) => {
    const grouped = React__default["default"].useMemo(() => groupBy__default["default"](columns, 'id'), [columns]);
    return React__default["default"].useMemo(() => {
        return sorters.map(sorter => {
            const [column] = grouped[sorter.id] || [];
            const label = (sorter === null || sorter === void 0 ? void 0 : sorter.label) || (column === null || column === void 0 ? void 0 : column.label);
            return Object.assign(Object.assign({}, sorter), { label });
        });
    }, [grouped, sorters]);
};

exports.useLabeledSorters = useLabeledSorters;
