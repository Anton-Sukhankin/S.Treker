'use strict';

var tslib = require('tslib');
var React = require('react');
var tendUiLocale = require('@10d/tend-ui-locale');
var tendUiUtils = require('@10d/tend-ui-utils');
var Close = require('@10d/tend-ui-icons/Close');
var tendUiTheme = require('@10d/tend-ui-theme');
var tendUiPrimitives = require('@10d/tend-ui-primitives');
var tendUiGrid = require('@10d/tend-ui-grid');
var styled = require('./styled.js');
var ScrollPosition = require('./components/ScrollPosition/ScrollPosition.js');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

const Modal = (_a) => {
    var { footer, okButtonProps, cancelButtonProps, okText = 'Принять', cancelText = 'Отмена', scroll = 'body', size = 'medium', confirmLoading, closeIconTooltip, title, children, centered, style, bodyStyle, width, styles } = _a, props = tslib.__rest(_a, ["footer", "okButtonProps", "cancelButtonProps", "okText", "cancelText", "scroll", "size", "confirmLoading", "closeIconTooltip", "title", "children", "centered", "style", "bodyStyle", "width", "styles"]);
    const t = tendUiLocale.useTranslation();
    const theme = tendUiTheme.useTheme();
    const [headerCSS, setHeaderCSS] = React__default["default"].useState();
    const [footerCSS, setFooterCSS] = React__default["default"].useState();
    const isWindowScroll = scroll === 'window';
    const _style = React__default["default"].useMemo(() => {
        if (centered)
            return style;
        if (isWindowScroll)
            return Object.assign({ top: 100 }, style);
        const value = (style === null || style === void 0 ? void 0 : style.top) || 100;
        const top = typeof value === 'string' ? value : `${value}px`;
        return Object.assign(Object.assign({}, style), { top, height: `calc(100vh - ${top})` });
    }, [centered, isWindowScroll, style]);
    const _bodyStyle = React__default["default"].useMemo(() => {
        if (centered)
            return bodyStyle;
        if (isWindowScroll)
            return bodyStyle;
        return Object.assign(Object.assign({}, bodyStyle), { overflowY: 'auto' });
    }, [bodyStyle, centered, isWindowScroll]);
    const _width = React__default["default"].useMemo(() => {
        if (width)
            return width;
        return {
            large: 960,
            medium: 720,
            small: 460,
        }[size];
    }, [size, width]);
    const _styles = React__default["default"].useMemo(() => (Object.assign(Object.assign({}, styles), { header: Object.assign(Object.assign({}, styles === null || styles === void 0 ? void 0 : styles.header), headerCSS), footer: Object.assign(Object.assign(Object.assign({}, styles === null || styles === void 0 ? void 0 : styles.footer), footerCSS), { margin: 0 }) })), [footerCSS, headerCSS, styles]);
    const noFooter = footer === null;
    const _title = React__default["default"].useMemo(() => {
        if (!title)
            return title;
        if (Array.isArray(title))
            return (React__default["default"].createElement(tendUiGrid.Box, { "$display": 'flex', "$flexDirection": 'column', "$alignItems": 'flex-start', "$gap": 8 }, title.map(node => node)));
        return title;
    }, [title]);
    const _footer = React__default["default"].useMemo(() => {
        var _a, _b;
        if (tendUiUtils.isUndefined(footer)) {
            return (React__default["default"].createElement(tendUiGrid.Box, { "$display": 'inline-flex', "$alignItems": 'center', "$gap": 12 },
                React__default["default"].createElement(tendUiPrimitives.Button, Object.assign({ "data-testid": 'tend-ui-modal-cancel-button', variant: 'secondary' }, cancelButtonProps, { onClick: (_a = cancelButtonProps === null || cancelButtonProps === void 0 ? void 0 : cancelButtonProps.onClick) !== null && _a !== void 0 ? _a : props.onCancel }), (cancelButtonProps === null || cancelButtonProps === void 0 ? void 0 : cancelButtonProps.children) || cancelText),
                React__default["default"].createElement(tendUiPrimitives.Button, Object.assign({ "data-testid": 'tend-ui-modal-ok-button', loading: confirmLoading }, okButtonProps, { onClick: (_b = okButtonProps === null || okButtonProps === void 0 ? void 0 : okButtonProps.onClick) !== null && _b !== void 0 ? _b : props.onOk }), (okButtonProps === null || okButtonProps === void 0 ? void 0 : okButtonProps.children) || okText)));
        }
        if (Array.isArray(footer))
            return (React__default["default"].createElement(tendUiGrid.Box, { "$display": 'inline-flex', "$alignItems": 'center', "$gap": 12 }, footer.map(node => node)));
        return footer;
    }, [
        cancelButtonProps,
        cancelText,
        confirmLoading,
        footer,
        okButtonProps,
        okText,
        props.onCancel,
        props.onOk,
    ]);
    const tooltipProps = React__default["default"].useMemo(() => {
        if (!closeIconTooltip)
            return { title: t(['general', 'close']) };
        return closeIconTooltip;
    }, [closeIconTooltip, t]);
    return (React__default["default"].createElement(styled.Root, Object.assign({ "data-testid": 'tend-ui-modal' }, props, { "$theme": theme, "$noFooter": noFooter, "$scroll": scroll, centered: centered, title: _title, footer: _footer, width: _width, style: _style, bodyStyle: _bodyStyle, styles: _styles, closeIcon: React__default["default"].createElement(tendUiPrimitives.Tooltip, Object.assign({}, tooltipProps),
            React__default["default"].createElement(Close.Close, null)) }),
        React__default["default"].createElement(ScrollPosition.ScrollPosition, { onScrollPositionChange: React__default["default"].useCallback(position => {
                switch (position) {
                    case 'top':
                        setHeaderCSS({});
                        setFooterCSS({
                            boxShadow: '0px 0px 6px 0px rgba(0, 0, 0, 0.08)',
                        });
                        break;
                    case 'middle':
                        setHeaderCSS({
                            boxShadow: '0px 0px 6px 0px rgba(0, 0, 0, 0.08)',
                        });
                        setFooterCSS({
                            boxShadow: '0px 0px 6px 0px rgba(0, 0, 0, 0.08)',
                        });
                        break;
                    case 'bottom':
                        setHeaderCSS({
                            boxShadow: '0px 0px 6px 0px rgba(0, 0, 0, 0.08)',
                        });
                        setFooterCSS({});
                        break;
                }
            }, []) }, children)));
};
Modal.displayName = 'Modal';

exports.Modal = Modal;
