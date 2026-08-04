'use strict';

var rangeInputValidator = require('./rangeInputValidator.js');
var uploadMaxAttachmentsValidator = require('./uploadMaxAttachmentsValidator.js');



exports.rangeInputValidator = rangeInputValidator.rangeInputValidator;
exports.createUploadMaxAttachmentsValidator = uploadMaxAttachmentsValidator.createUploadMaxAttachmentsValidator;
