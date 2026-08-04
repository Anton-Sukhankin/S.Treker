'use strict';

var React = require('react');
var tendUiPrimitives = require('@10d/tend-ui-primitives');
var styled = require('../../styled.js');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

const Footer = (props) => {
    var _a, _b, _c, _d, _e, _f;
    const [loading, setLoading] = React__default["default"].useState(false);
    const handleCancelClick = React__default["default"].useCallback(() => {
        var _a;
        const onCancelReturnValue = (_a = props.onCancel) === null || _a === void 0 ? void 0 : _a.call(props);
        if (onCancelReturnValue instanceof Promise === false) {
            props.destroy();
            return;
        }
        setLoading(true);
        onCancelReturnValue
            .then(() => {
            props.destroy();
        })
            .catch(() => {
            console.log('[Dialog]: Error');
        })
            .finally(() => {
            setLoading(false);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.onCancel, props.destroy]);
    const handleOkClick = React__default["default"].useCallback(() => {
        var _a;
        if (!props.onOk) {
            props.destroy();
            return;
        }
        const onOkReturnValue = (_a = props.onOk) === null || _a === void 0 ? void 0 : _a.call(props);
        if (onOkReturnValue instanceof Promise === false) {
            props.destroy();
            return;
        }
        setLoading(true);
        onOkReturnValue
            .then(() => {
            props.destroy();
        })
            .catch(() => {
            console.log('[Dialog]: Error');
        })
            .finally(() => {
            setLoading(false);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.onOk, props.destroy]);
    if (typeof props.footer === 'undefined')
        return (React__default["default"].createElement(styled.Box, { "$display": 'flex', "$justifyContent": 'flex-end', "$alignItems": 'center', "$gap": 12, "$margin": '24px 0 0', "$padding": props.padding },
            React__default["default"].createElement(tendUiPrimitives.Button, Object.assign({ "data-testid": 'tend-ui-dialog-cancel-button', variant: 'link', loading: loading }, props.cancelButtonProps, { onClick: (_b = (_a = props.cancelButtonProps) === null || _a === void 0 ? void 0 : _a.onClick) !== null && _b !== void 0 ? _b : handleCancelClick }), ((_c = props.cancelButtonProps) === null || _c === void 0 ? void 0 : _c.children) || props.cancelText),
            React__default["default"].createElement(tendUiPrimitives.Button, Object.assign({ "data-testid": 'tend-ui-dialog-ok-button', loading: loading }, props.okButtonProps, { onClick: (_e = (_d = props.okButtonProps) === null || _d === void 0 ? void 0 : _d.onClick) !== null && _e !== void 0 ? _e : handleOkClick }), ((_f = props.okButtonProps) === null || _f === void 0 ? void 0 : _f.children) || props.okText)));
    if (Array.isArray(props.footer))
        return (React__default["default"].createElement(styled.Box, { "$display": 'flex', "$alignItems": 'center', "$justifyContent": 'flex-end', "$gap": 12, "$margin": '24px 0 0', "$padding": props.padding }, props.footer.map(node => node)));
    if (!props.footer)
        return React__default["default"].createElement(React__default["default"].Fragment, null, props.footer);
    return (React__default["default"].createElement(styled.Box, { "$margin": '24px 0 0', "$padding": props.padding }, props.footer));
};

exports.Footer = Footer;
