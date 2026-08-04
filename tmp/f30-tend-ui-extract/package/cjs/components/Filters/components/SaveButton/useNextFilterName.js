'use strict';

var React = require('react');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

const useNextFilterName = (names) => {
    return React__default["default"].useMemo(() => {
        const numbers = names
            .map(name => name.match(/Сохраненный фильтр (\d+)/))
            .filter((value) => Boolean(value))
            .map(([, matched]) => parseInt(matched, 10))
            .sort((a, b) => a - b);
        const missing = Array.from({ length: numbers.length + 1 }, (_, i) => i + 1).find(n => !numbers.includes(n));
        return `Сохраненный фильтр ${missing}`;
    }, [names]);
};

exports.useNextFilterName = useNextFilterName;
