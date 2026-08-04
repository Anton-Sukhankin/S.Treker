'use strict';

var React = require('react');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

const useVisibility = () => {
    const [visible, setVisible] = React__default["default"].useState(false);
    const show = React__default["default"].useCallback(() => {
        setVisible(true);
    }, []);
    const hide = React__default["default"].useCallback(() => {
        setVisible(false);
    }, []);
    const toggle = React__default["default"].useCallback(() => {
        setVisible(p => !p);
    }, []);
    return {
        visible,
        show,
        hide,
        toggle,
    };
};

exports.useVisibility = useVisibility;
