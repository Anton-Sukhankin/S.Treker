'use strict';

var React = require('react');
var isBoolean = require('@10d/tend-ui-utils/isBoolean');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

const useDisabled = (props, values) => {
    const disabled = React__default["default"].useMemo(() => {
        if (isBoolean.isBoolean(props.disabled))
            return props.disabled;
        if (!Array.isArray(props.config.requires))
            return;
        if (!values)
            return;
        // Updating disabled state
        const disabled = props.config.requires.some(filterName => {
            const key = filterName;
            const hasValue = values[key];
            return !hasValue;
        });
        return disabled;
    }, [props.config.requires, props.disabled, values]);
    return disabled;
};

exports.useDisabled = useDisabled;
