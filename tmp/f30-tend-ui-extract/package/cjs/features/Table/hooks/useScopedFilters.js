'use strict';

var React = require('react');
var createScopedConfig = require('../tools/createScopedConfig.js');
var Scope = require('../consts/Scope.js');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

const useScopedFilters = (filters) => {
    const scoped = React__default["default"].useMemo(() => filters.map(createScopedConfig.createScopedConfig(Scope.Scope.Filters)), [filters]);
    return scoped;
};

exports.useScopedFilters = useScopedFilters;
