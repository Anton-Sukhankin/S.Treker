'use strict';

var contextFactory = require('../../../factories/contextFactory.js');

const [AvatarContext, useAvatarContext] = contextFactory.contextFactory();

exports.AvatarContext = AvatarContext;
exports.useAvatarContext = useAvatarContext;
