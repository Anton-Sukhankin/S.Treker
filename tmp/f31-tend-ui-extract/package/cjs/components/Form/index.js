'use strict';

var Form = require('./Form.js');
var rangeInputValidator = require('./validators/rangeInputValidator.js');
var uploadMaxAttachmentsValidator = require('./validators/uploadMaxAttachmentsValidator.js');



exports.Form = Form.Form;
exports.rangeInputValidator = rangeInputValidator.rangeInputValidator;
exports.createUploadMaxAttachmentsValidator = uploadMaxAttachmentsValidator.createUploadMaxAttachmentsValidator;
