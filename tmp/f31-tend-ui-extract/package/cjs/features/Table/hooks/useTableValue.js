'use strict';

var React = require('react');
var ValueContext = require('../contexts/ValueContext.js');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

const useTableValue = (id) => {
    const value = ValueContext.useValueContext();
    return React__default["default"].useMemo(() => { var _a, _b; return ({ filter: (_a = value === null || value === void 0 ? void 0 : value.filters) === null || _a === void 0 ? void 0 : _a[id], sorter: (_b = value === null || value === void 0 ? void 0 : value.sorters) === null || _b === void 0 ? void 0 : _b[id] }); }, [value === null || value === void 0 ? void 0 : value.filters, value === null || value === void 0 ? void 0 : value.sorters, id]);
};

exports.useTableValue = useTableValue;
