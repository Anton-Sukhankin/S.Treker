'use strict';

var tslib = require('tslib');
var React = require('react');
var tendUiLocale = require('@10d/tend-ui-locale');
var Close = require('@10d/tend-ui-icons/Close');
var tendUiTypography = require('@10d/tend-ui-typography');
var tendUiPrimitives = require('@10d/tend-ui-primitives');
var Box = require('@10d/tend-ui-grid/Box');
var tendUiTheme = require('@10d/tend-ui-theme');
var tendUiUtils = require('@10d/tend-ui-utils');
var styled = require('./styled.js');
var hooks = require('./hooks.js');
var ScrollPosition = require('./components/ScrollPosition/ScrollPosition.js');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

const FULLSCREEN_OFFSET = '16px';
const CloseIcon = () => {
    const t = tendUiLocale.useTranslation();
    return (React__default["default"].createElement(tendUiPrimitives.Tooltip, { title: t(['general', 'close']) },
        React__default["default"].createElement(Close.Close, { color: 'gray650', size: 20 })));
};
/**
 * @deprecated Компонент устарел. Используйте `Drawer` из пакета `@10d/tend-ui-primitives`
 */
const Drawer = (_a) => {
    var { fullscreen = false, above, before, title, description, size = 'medium', placement = 'right', okButtonProps, onOk, okText = 'Принять', cancelButtonProps, onCancel, cancelText = 'Отмена', footer, closeIcon = React__default["default"].createElement(CloseIcon, null), children, width, height, styles } = _a, props = tslib.__rest(_a, ["fullscreen", "above", "before", "title", "description", "size", "placement", "okButtonProps", "onOk", "okText", "cancelButtonProps", "onCancel", "cancelText", "footer", "closeIcon", "children", "width", "height", "styles"]);
    if (process.env.NODE_ENV === 'development') {
        tendUiUtils.INTERNAL_TendUILogger.warning([
            '<Drawer /> из пакета "@10d/tend-ui" устарел и больше не поддерживается.',
            '',
            'Используйте <Drawer /> из пакета "@10d/tend-ui-primitives"',
        ]);
        if (size === 'default') {
            tendUiUtils.INTERNAL_TendUILogger.warning([
                `<Drawer size="${size}" /> устарел.`,
                'Используйте <Drawer size="medium" />',
            ]);
        }
    }
    const theme = tendUiTheme.useTheme();
    const _size = hooks.useSize(size);
    const isTop = placement === 'top';
    const isBottom = placement === 'bottom';
    const isLeft = placement === 'left';
    const isRight = placement === 'right';
    const isVertical = isTop || isBottom;
    const isHorizontal = isLeft || isRight;
    const _title = React__default["default"].useMemo(() => {
        if ([!title, !description, !before, !above].every(Boolean))
            return;
        if (above)
            return (React__default["default"].createElement(Box.Box, null,
                above,
                React__default["default"].createElement(Box.Box, { "$display": 'flex', "$gap": 12 },
                    before && React__default["default"].createElement(Box.Box, null, before),
                    React__default["default"].createElement(Box.Box, { "$display": 'flex', "$flexDirection": 'column' },
                        title && (React__default["default"].createElement(tendUiTypography.Title, { margin: '0', level: 'h5' }, title)),
                        description && (React__default["default"].createElement(tendUiTypography.Text, { color: 'gray650', fontWeight: '400', size: 'small' }, description))))));
        return (React__default["default"].createElement(Box.Box, { "$display": 'flex', "$gap": 12 },
            before && React__default["default"].createElement(Box.Box, null, before),
            (title || description) && (React__default["default"].createElement(Box.Box, { "$display": 'flex', "$flexDirection": 'column' },
                title && (React__default["default"].createElement(tendUiTypography.Title, { margin: '0', level: 'h5' }, title)),
                description && (React__default["default"].createElement(tendUiTypography.Text, { color: 'gray650', fontWeight: '400', size: 'small' }, description))))));
    }, [above, before, description, title]);
    const _footer = React__default["default"].useMemo(() => {
        var _a, _b;
        if (typeof footer === 'undefined') {
            return (React__default["default"].createElement(Box.Box, { "$width": '100%', "$display": 'inline-flex', "$alignItems": 'center', "$justifyContent": 'flex-end', "$gap": 8 },
                React__default["default"].createElement(tendUiPrimitives.Button, Object.assign({ "data-testid": 'tend-ui-drawer-cancel-button', variant: 'secondary' }, cancelButtonProps, { onClick: (_a = cancelButtonProps === null || cancelButtonProps === void 0 ? void 0 : cancelButtonProps.onClick) !== null && _a !== void 0 ? _a : onCancel }), (cancelButtonProps === null || cancelButtonProps === void 0 ? void 0 : cancelButtonProps.children) || cancelText),
                React__default["default"].createElement(tendUiPrimitives.Button, Object.assign({ "data-testid": 'tend-ui-drawer-ok-button' }, okButtonProps, { onClick: (_b = okButtonProps === null || okButtonProps === void 0 ? void 0 : okButtonProps.onClick) !== null && _b !== void 0 ? _b : onOk }), (okButtonProps === null || okButtonProps === void 0 ? void 0 : okButtonProps.children) || okText)));
        }
        return footer;
    }, [cancelButtonProps, cancelText, footer, okButtonProps, okText, onCancel, onOk]);
    const contentWrapperStyle = React__default["default"].useMemo(() => ({
        top: Object.assign(Object.assign({}, props.contentWrapperStyle), { overflow: 'hidden' }),
        right: Object.assign(Object.assign({}, props.contentWrapperStyle), { overflow: 'hidden' }),
        bottom: Object.assign(Object.assign({}, props.contentWrapperStyle), { overflow: 'hidden' }),
        left: Object.assign(Object.assign({}, props.contentWrapperStyle), { overflow: 'hidden' }),
    }[placement]), [placement, props.contentWrapperStyle]);
    const _width = (() => {
        if (fullscreen && isHorizontal)
            return `calc(100% - ${FULLSCREEN_OFFSET})`;
        if (width)
            return width;
        return {
            default: '500px',
            small: '400px',
            medium: '500px',
            large: '800px',
        }[size];
    })();
    const _height = (() => {
        if (fullscreen && isVertical)
            return `calc(100% - ${FULLSCREEN_OFFSET})`;
        return height;
    })();
    const _styles = React__default["default"].useMemo(() => (Object.assign(Object.assign({}, styles), { header: Object.assign(Object.assign({}, styles === null || styles === void 0 ? void 0 : styles.header), { borderBottom: 'none' }), body: Object.assign(Object.assign({}, styles === null || styles === void 0 ? void 0 : styles.body), { padding: '0 24px' }), footer: Object.assign(Object.assign({}, styles === null || styles === void 0 ? void 0 : styles.footer), { borderTop: 'none', padding: '16px 24px' }) })), [styles]);
    const [className, setClassName] = React__default["default"].useState('');
    return (React__default["default"].createElement(styled.Root, Object.assign({ "data-testid": 'tend-ui-drawer' }, props, { "$theme": theme, styles: _styles, contentWrapperStyle: contentWrapperStyle, title: _title, footer: _footer, placement: placement, width: _width, height: _height, size: _size, closeIcon: closeIcon, classNames: { content: className } }),
        React__default["default"].createElement(ScrollPosition.ScrollPosition, { onScrollPositionChange: React__default["default"].useCallback(position => {
                switch (position) {
                    case 'top':
                        setClassName('tend-ui-drawer-footer-shadow');
                        break;
                    case 'middle':
                        setClassName(['tend-ui-drawer-header-shadow', 'tend-ui-drawer-footer-shadow'].join(' '));
                        break;
                    case 'bottom':
                        setClassName('tend-ui-drawer-header-shadow');
                        break;
                }
            }, []) }, children)));
};
Drawer.displayName = 'Drawer';

exports.Drawer = Drawer;
