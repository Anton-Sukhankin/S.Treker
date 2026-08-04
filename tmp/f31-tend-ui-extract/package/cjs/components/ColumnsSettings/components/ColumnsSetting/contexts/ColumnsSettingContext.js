'use strict';

var contextFactory = require('../../../../../factories/contextFactory.js');

/**
 * @internal Not for public usage
 */
const [ColumnsSettingContext, useColumnsSettingContext] = contextFactory.contextFactory();

exports.ColumnsSettingContext = ColumnsSettingContext;
exports.useColumnsSettingContext = useColumnsSettingContext;
