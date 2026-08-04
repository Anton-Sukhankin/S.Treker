'use strict';

var contextFactory = require('../../../../../../../factories/contextFactory.js');

const [SorterContext, useSorterContext] = contextFactory.contextFactory();

exports.SorterContext = SorterContext;
exports.useSorterContext = useSorterContext;
