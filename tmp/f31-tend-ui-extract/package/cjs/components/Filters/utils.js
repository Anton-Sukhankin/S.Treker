'use strict';

var extract$1 = require('@10d/tend-ui-utils/extract');

const pack = (payload, scope) => {
    if (scope)
        return { [scope]: payload };
    return payload;
};
const extract = (payload, scope) => {
    if (scope)
        return extract$1.extract(payload, [scope]) || {};
    return payload;
};

exports.extract = extract;
exports.pack = pack;
