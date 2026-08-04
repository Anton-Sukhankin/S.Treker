'use strict';

var contextFactory = require('../../../factories/contextFactory.js');

const [TabsContext, useTabsContext] = contextFactory.contextFactory();

exports.TabsContext = TabsContext;
exports.useTabsContext = useTabsContext;
