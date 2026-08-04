'use strict';

var contextFactory = require('../../../../../../../factories/contextFactory.js');

const [FilterContext, useFilterContext] = contextFactory.contextFactory();

exports.FilterContext = FilterContext;
exports.useFilterContext = useFilterContext;
