'use strict';

var contextFactory = require('../../../factories/contextFactory.js');

const [TableContext, useTableContext] = contextFactory.contextFactory();

exports.TableContext = TableContext;
exports.useTableContext = useTableContext;
