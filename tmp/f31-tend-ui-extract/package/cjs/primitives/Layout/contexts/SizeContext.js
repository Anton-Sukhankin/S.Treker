'use strict';

var contextFactory = require('../../../factories/contextFactory.js');

const [SizeContext, useSizeContext] = contextFactory.contextFactory();

exports.SizeContext = SizeContext;
exports.useSizeContext = useSizeContext;
