'use strict';

var contextFactory = require('../../../factories/contextFactory.js');

const [LayoutContext, useLayoutContext] = contextFactory.contextFactory();

exports.LayoutContext = LayoutContext;
exports.useLayoutContext = useLayoutContext;
