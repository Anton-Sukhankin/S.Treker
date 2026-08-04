'use strict';

var tslib = require('tslib');
var React = require('react');
var ReactDOM = require('react-dom');
var useTranslation = require('@10d/tend-ui-locale/hooks/useTranslation');
var tendUiTheme = require('@10d/tend-ui-theme');
var tendUiTypography = require('@10d/tend-ui-typography');
var tendUiGrid = require('@10d/tend-ui-grid');
var tendUiPrimitives = require('@10d/tend-ui-primitives');
var Badge = require('../Badge/Badge.js');
var styled = require('./styled.js');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);
var ReactDOM__default = /*#__PURE__*/_interopDefault(ReactDOM);

const BaseActions = (_a, ref) => {
    var { visible, counter, counterText, okText, cancelText, okButtonProps, cancelButtonProps, onOk, onCancel, extra, offset } = _a, props = tslib.__rest(_a, ["visible", "counter", "counterText", "okText", "cancelText", "okButtonProps", "cancelButtonProps", "onOk", "onCancel", "extra", "offset"]);
    const t = useTranslation.useTranslation();
    const theme = tendUiTheme.useTheme();
    const isVisible = (() => {
        if (typeof visible === 'boolean')
            return visible;
        if (typeof counter === 'object')
            return typeof counter.inner === 'number' && counter.inner > 0;
        return typeof counter === 'number' && counter > 0;
    })();
    const extraNode = React__default["default"].useMemo(() => {
        var _a, _b;
        if (!extra) {
            return (React__default["default"].createElement(tendUiGrid.Box, { "$display": 'inline-flex', "$alignItems": 'center', "$gap": 12 },
                React__default["default"].createElement(tendUiPrimitives.Button, Object.assign({ "data-testid": 'tend-ui-actions-cancel-button', variant: 'secondary' }, cancelButtonProps, { onClick: (_a = cancelButtonProps === null || cancelButtonProps === void 0 ? void 0 : cancelButtonProps.onClick) !== null && _a !== void 0 ? _a : onCancel }), (cancelButtonProps === null || cancelButtonProps === void 0 ? void 0 : cancelButtonProps.children) ||
                    cancelText ||
                    t(['primitives', 'Actions', 'cancel'])),
                React__default["default"].createElement(tendUiPrimitives.Button, Object.assign({ "data-testid": 'tend-ui-actions-ok-button' }, okButtonProps, { onClick: (_b = okButtonProps === null || okButtonProps === void 0 ? void 0 : okButtonProps.onClick) !== null && _b !== void 0 ? _b : onOk }), (okButtonProps === null || okButtonProps === void 0 ? void 0 : okButtonProps.children) || okText || t(['primitives', 'Actions', 'accept']))));
        }
        if (Array.isArray(extra))
            return (React__default["default"].createElement(tendUiGrid.Box, { "$display": 'inline-flex', "$alignItems": 'center', "$gap": 12 }, extra.map(node => node)));
        return extra;
    }, [cancelButtonProps, cancelText, extra, okButtonProps, okText, onCancel, onOk, t]);
    const badgeProps = React__default["default"].useMemo(() => {
        if (typeof counter === 'object')
            return Object.assign({ preset: 'blue' }, counter);
        return { preset: 'blue', inner: counter };
    }, [counter]);
    return ReactDOM__default["default"].createPortal(React__default["default"].createElement(styled.Root, Object.assign({ "data-testid": 'tend-ui-actions' }, props, { ref: ref, theme: theme, "$visible": isVisible, "$offset": offset }),
        React__default["default"].createElement(tendUiGrid.Box, { "$display": 'flex', "$alignItems": 'center', "$gap": 4 },
            React__default["default"].createElement(tendUiTypography.Text, { size: 'large', strong: true }, counterText !== null && counterText !== void 0 ? counterText : t(['primitives', 'Actions', 'selected'])),
            React__default["default"].createElement(Badge.Badge, Object.assign({}, badgeProps))),
        React__default["default"].createElement(styled.Extra, null, extraNode)), document.body);
};
const Actions = React__default["default"].forwardRef(BaseActions);
Actions.displayName = 'Actions';

exports.Actions = Actions;
