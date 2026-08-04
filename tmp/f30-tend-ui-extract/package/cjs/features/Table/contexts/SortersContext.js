'use strict';

var contextFactory = require('../../../factories/contextFactory.js');

const [SortersContext, useSortersContext] = contextFactory.contextFactory('Table.SortersContext');

exports.SortersContext = SortersContext;
exports.useSortersContext = useSortersContext;
