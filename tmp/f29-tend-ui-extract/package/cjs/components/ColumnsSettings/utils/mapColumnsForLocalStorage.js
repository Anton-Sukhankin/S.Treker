'use strict';

var pick = require('lodash/pick');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var pick__default = /*#__PURE__*/_interopDefault(pick);

const mapColumnsForLocalStorage = (columns) => {
    return columns.map(column => pick__default["default"](column, ['id', 'visible', 'disabled', 'draggable', 'fixed', 'pinnable']));
};

exports.mapColumnsForLocalStorage = mapColumnsForLocalStorage;
