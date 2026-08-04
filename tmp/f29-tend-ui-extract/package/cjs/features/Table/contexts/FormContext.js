'use strict';

var contextFactory = require('../../../factories/contextFactory.js');

const [FormContext, useFormContext] = contextFactory.contextFactory('Table.FormContext');

exports.FormContext = FormContext;
exports.useFormContext = useFormContext;
