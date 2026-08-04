'use strict';

var React = require('react');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

const useMap = () => {
    const map = React__default["default"].useRef(new Map());
    const set = React__default["default"].useCallback((key, value) => {
        map.current.set(key, value);
        return value;
    }, []);
    const get = React__default["default"].useCallback((key) => {
        const value = map.current.get(key);
        return value;
    }, []);
    const del = React__default["default"].useCallback((key) => {
        const value = map.current.get(key);
        map.current.delete(key);
        return value;
    }, []);
    const has = React__default["default"].useCallback((key) => {
        return map.current.has(key);
    }, []);
    const clear = React__default["default"].useCallback(() => {
        map.current.clear();
    }, []);
    return {
        set,
        get,
        del,
        has,
        clear,
    };
};

exports.useMap = useMap;
