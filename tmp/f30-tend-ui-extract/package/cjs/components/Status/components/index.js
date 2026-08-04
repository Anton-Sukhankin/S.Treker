'use strict';

var NotFound = require('./NotFound/NotFound.js');
var Forbidden = require('./Forbidden/Forbidden.js');
var InternalServerError = require('./InternalServerError/InternalServerError.js');



exports.NotFound = NotFound.NotFound;
exports.Forbidden = Forbidden.Forbidden;
exports.InternalServerError = InternalServerError.InternalServerError;
