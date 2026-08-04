'use strict';

var omit = require('lodash/omit');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var omit__default = /*#__PURE__*/_interopDefault(omit);

const patchColumnPosition = (column, position) => {
    if (position === 'none')
        return omit__default["default"](column, 'fixed');
    return Object.assign(Object.assign({}, column), { fixed: position });
};

exports.patchColumnPosition = patchColumnPosition;
