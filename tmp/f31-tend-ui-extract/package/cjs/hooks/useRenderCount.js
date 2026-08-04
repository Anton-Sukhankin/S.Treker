'use strict';

var React = require('react');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

const useRenderCount = (name) => {
    const count = React__default["default"].useRef(0);
    if (process.env.NODE_ENV === 'production')
        return;
    count.current++;
    if (name) {
        console.warn(`[${name}] has rendered ${count.current} times`);
    }
    return count.current;
};

exports.useRenderCount = useRenderCount;
