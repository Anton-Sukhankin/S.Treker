'use strict';

var React = require('react');
var SortersContext = require('../contexts/SortersContext.js');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

const useTableSorters = () => {
    const { sorters } = SortersContext.useSortersContext();
    const model = React__default["default"].useMemo(() => ({
        sorters,
    }), [sorters]);
    return model;
};

exports.useTableSorters = useTableSorters;
