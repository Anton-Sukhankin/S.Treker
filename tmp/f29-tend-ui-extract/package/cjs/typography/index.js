'use strict';

var Typography = require('./Typography.js');
var tendUiTypography = require('@10d/tend-ui-typography');



exports.Typography = Typography.Typography;
Object.defineProperty(exports, "Em", {
	enumerable: true,
	get: function () { return tendUiTypography.Em; }
});
Object.defineProperty(exports, "Link", {
	enumerable: true,
	get: function () { return tendUiTypography.Link; }
});
Object.defineProperty(exports, "Paragraph", {
	enumerable: true,
	get: function () { return tendUiTypography.Paragraph; }
});
Object.defineProperty(exports, "Quote", {
	enumerable: true,
	get: function () { return tendUiTypography.Quote; }
});
Object.defineProperty(exports, "Strong", {
	enumerable: true,
	get: function () { return tendUiTypography.Strong; }
});
Object.defineProperty(exports, "Text", {
	enumerable: true,
	get: function () { return tendUiTypography.Text; }
});
Object.defineProperty(exports, "Title", {
	enumerable: true,
	get: function () { return tendUiTypography.Title; }
});
