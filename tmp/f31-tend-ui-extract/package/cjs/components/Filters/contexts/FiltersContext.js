'use strict';

var contextFactory = require('../../../factories/contextFactory.js');

const [FiltersContext, useFiltersContext] = contextFactory.contextFactory();

exports.FiltersContext = FiltersContext;
exports.useFiltersContext = useFiltersContext;
