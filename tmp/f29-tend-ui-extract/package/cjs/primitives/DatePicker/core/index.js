'use strict';

var generatePicker = require('antd-core/es/date-picker/generatePicker');
var dateFns = require('rc-picker/es/generate/dateFns');
var dayjs = require('rc-picker/es/generate/dayjs');
var moment = require('rc-picker/es/generate/moment');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var generatePicker__default = /*#__PURE__*/_interopDefault(generatePicker);
var dateFns__default = /*#__PURE__*/_interopDefault(dateFns);
var dayjs__default = /*#__PURE__*/_interopDefault(dayjs);
var moment__default = /*#__PURE__*/_interopDefault(moment);



Object.defineProperty(exports, "createPicker", {
	enumerable: true,
	get: function () { return generatePicker__default["default"]; }
});
Object.defineProperty(exports, "dateFnsConfig", {
	enumerable: true,
	get: function () { return dateFns__default["default"]; }
});
Object.defineProperty(exports, "dayjsConfig", {
	enumerable: true,
	get: function () { return dayjs__default["default"]; }
});
Object.defineProperty(exports, "momentConfig", {
	enumerable: true,
	get: function () { return moment__default["default"]; }
});
