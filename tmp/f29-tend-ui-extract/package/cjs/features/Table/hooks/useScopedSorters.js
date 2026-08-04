'use strict';

var React = require('react');
var Scope = require('../consts/Scope.js');
var createScopedConfig = require('../tools/createScopedConfig.js');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

const useScopedSorters = (sorters) => {
    const scoped = React__default["default"].useMemo(() => sorters.map(createScopedConfig.createScopedConfig(Scope.Scope.Sorters)), [sorters]);
    return scoped;
};

exports.useScopedSorters = useScopedSorters;
