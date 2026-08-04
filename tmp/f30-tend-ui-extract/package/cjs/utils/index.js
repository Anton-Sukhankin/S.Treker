'use strict';

var tendUiUtils = require('@10d/tend-ui-utils');



Object.keys(tendUiUtils).forEach(function (k) {
	if (k !== 'default' && !Object.prototype.hasOwnProperty.call(exports, k)) Object.defineProperty(exports, k, {
		enumerable: true,
		get: function () { return tendUiUtils[k]; }
	});
});
