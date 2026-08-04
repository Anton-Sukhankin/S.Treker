'use strict';

var React = require('react');
var Form = require('../../Form/Form.js');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

const useFilterCounter = (name) => {
    const form = Form.Form.useFormInstance();
    const value = Form.Form.useWatch(name, form);
    return React__default["default"].useMemo(() => {
        if (!value)
            return;
        if (Array.isArray(value))
            return value.length;
        return 1;
    }, [value]);
};

exports.useFilterCounter = useFilterCounter;
