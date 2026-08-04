'use strict';

var React = require('react');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

const useBoolean = (initialState = false) => {
    const [value, setValue] = React__default["default"].useState(initialState);
    const setter = React__default["default"].useCallback((value) => {
        if (typeof value === 'boolean') {
            setValue(value);
            return;
        }
        setValue(prev => !prev);
    }, []);
    return [value, setter];
};

exports.useBoolean = useBoolean;
