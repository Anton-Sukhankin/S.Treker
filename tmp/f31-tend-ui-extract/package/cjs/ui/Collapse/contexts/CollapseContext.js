'use strict';

var contextFactory = require('../../../factories/contextFactory.js');

const [CollapseContext, useCollapseContext] = contextFactory.contextFactory();

exports.CollapseContext = CollapseContext;
exports.useCollapseContext = useCollapseContext;
