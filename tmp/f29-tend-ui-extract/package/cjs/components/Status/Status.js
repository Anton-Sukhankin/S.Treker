'use strict';

var tslib = require('tslib');
var React = require('react');
var NotFound = require('./components/NotFound/NotFound.js');
var Forbidden = require('./components/Forbidden/Forbidden.js');
var InternalServerError = require('./components/InternalServerError/InternalServerError.js');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

const Status = (_a) => {
    var { status = 404 } = _a, props = tslib.__rest(_a, ["status"]);
    return ({
        404: React__default["default"].createElement(NotFound.NotFound, Object.assign({}, props)),
        403: React__default["default"].createElement(Forbidden.Forbidden, Object.assign({}, props)),
        500: React__default["default"].createElement(InternalServerError.InternalServerError, Object.assign({}, props)),
    }[status]);
};
Status.displayName = 'Status';

exports.Status = Status;
