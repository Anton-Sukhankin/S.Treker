'use strict';

var contextFactory = require('../../../factories/contextFactory.js');

const [FiltersContext, _useFiltersContext] = contextFactory.contextFactory('Table.FiltersContext');
const useFiltersContext = () => {
    const ctx = _useFiltersContext();
    return ctx;
};

exports.FiltersContext = FiltersContext;
exports.useFiltersContext = useFiltersContext;
