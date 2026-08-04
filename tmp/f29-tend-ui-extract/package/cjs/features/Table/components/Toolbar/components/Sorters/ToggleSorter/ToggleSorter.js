'use strict';

var React = require('react');
var ArrowUp = require('@10d/tend-ui-icons/ArrowUp');
var ArrowDown = require('@10d/tend-ui-icons/ArrowDown');
var styled = require('./styled.js');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

const ToggleSorter = ({ disabled, order = ['default', 'ascend', 'descend'], value, children, onChange, }) => {
    const [state, setState] = React__default["default"].useState(value !== null && value !== void 0 ? value : 'default');
    React__default["default"].useEffect(() => {
        if (!value)
            return;
        setState(value);
    }, [value]);
    const icon = React__default["default"].useMemo(() => {
        if (state === 'default')
            return null;
        if (state === 'ascend')
            return React__default["default"].createElement(ArrowUp.ArrowUp, null);
        return React__default["default"].createElement(ArrowDown.ArrowDown, null);
    }, [state]);
    const handleClick = React__default["default"].useCallback((_, value) => {
        if (!value)
            return;
        const current = order.indexOf(value);
        const idx = (current + 1) % order.length;
        const next = order[idx];
        setState(next);
        onChange === null || onChange === void 0 ? void 0 : onChange(next);
    }, [onChange, order]);
    return (React__default["default"].createElement(styled.Root, { disabled: disabled, value: state, after: icon, onClick: handleClick }, children));
};

exports.ToggleSorter = ToggleSorter;
