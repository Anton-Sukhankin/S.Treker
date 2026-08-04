'use strict';

var contextFactory = require('../../../factories/contextFactory.js');

const [ActionsButtonContext, useActionsButtonContext] = contextFactory.contextFactory();

exports.ActionsButtonContext = ActionsButtonContext;
exports.useActionsButtonContext = useActionsButtonContext;
