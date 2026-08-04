'use strict';

var TendUI = require('./TendUI.js');
var tendUiTheme = require('@10d/tend-ui-theme');



exports.TendUI = TendUI.TendUI;
Object.defineProperty(exports, "useColors", {
	enumerable: true,
	get: function () { return tendUiTheme.useColors; }
});
Object.defineProperty(exports, "useTheme", {
	enumerable: true,
	get: function () { return tendUiTheme.useTheme; }
});
