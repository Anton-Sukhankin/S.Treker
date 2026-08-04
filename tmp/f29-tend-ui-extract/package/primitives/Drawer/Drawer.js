import { __rest } from 'tslib';
import React from 'react';
import { useTranslation } from '@10d/tend-ui-locale';
import { Close } from '@10d/tend-ui-icons/Close';
import { Title, Text } from '@10d/tend-ui-typography';
import { Button, Tooltip } from '@10d/tend-ui-primitives';
import { Box } from '@10d/tend-ui-grid/Box';
import { useTheme } from '@10d/tend-ui-theme';
import { INTERNAL_TendUILogger } from '@10d/tend-ui-utils';
import { Root } from './styled.js';
import { useSize } from './hooks.js';
import { ScrollPosition } from './components/ScrollPosition/ScrollPosition.js';

const FULLSCREEN_OFFSET = '16px';
const CloseIcon = () => {
    const t = useTranslation();
    return (React.createElement(Tooltip, { title: t(['general', 'close']) },
        React.createElement(Close, { color: 'gray650', size: 20 })));
};
/**
 * @deprecated Компонент устарел. Используйте `Drawer` из пакета `@10d/tend-ui-primitives`
 */
const Drawer = (_a) => {
    var { fullscreen = false, above, before, title, description, size = 'medium', placement = 'right', okButtonProps, onOk, okText = 'Принять', cancelButtonProps, onCancel, cancelText = 'Отмена', footer, closeIcon = React.createElement(CloseIcon, null), children, width, height, styles } = _a, props = __rest(_a, ["fullscreen", "above", "before", "title", "description", "size", "placement", "okButtonProps", "onOk", "okText", "cancelButtonProps", "onCancel", "cancelText", "footer", "closeIcon", "children", "width", "height", "styles"]);
    if (process.env.NODE_ENV === 'development') {
        INTERNAL_TendUILogger.warning([
            '<Drawer /> из пакета "@10d/tend-ui" устарел и больше не поддерживается.',
            '',
            'Используйте <Drawer /> из пакета "@10d/tend-ui-primitives"',
        ]);
        if (size === 'default') {
            INTERNAL_TendUILogger.warning([
                `<Drawer size="${size}" /> устарел.`,
                'Используйте <Drawer size="medium" />',
            ]);
        }
    }
    const theme = useTheme();
    const _size = useSize(size);
    const isTop = placement === 'top';
    const isBottom = placement === 'bottom';
    const isLeft = placement === 'left';
    const isRight = placement === 'right';
    const isVertical = isTop || isBottom;
    const isHorizontal = isLeft || isRight;
    const _title = React.useMemo(() => {
        if ([!title, !description, !before, !above].every(Boolean))
            return;
        if (above)
            return (React.createElement(Box, null,
                above,
                React.createElement(Box, { "$display": 'flex', "$gap": 12 },
                    before && React.createElement(Box, null, before),
                    React.createElement(Box, { "$display": 'flex', "$flexDirection": 'column' },
                        title && (React.createElement(Title, { margin: '0', level: 'h5' }, title)),
                        description && (React.createElement(Text, { color: 'gray650', fontWeight: '400', size: 'small' }, description))))));
        return (React.createElement(Box, { "$display": 'flex', "$gap": 12 },
            before && React.createElement(Box, null, before),
            (title || description) && (React.createElement(Box, { "$display": 'flex', "$flexDirection": 'column' },
                title && (React.createElement(Title, { margin: '0', level: 'h5' }, title)),
                description && (React.createElement(Text, { color: 'gray650', fontWeight: '400', size: 'small' }, description))))));
    }, [above, before, description, title]);
    const _footer = React.useMemo(() => {
        var _a, _b;
        if (typeof footer === 'undefined') {
            return (React.createElement(Box, { "$width": '100%', "$display": 'inline-flex', "$alignItems": 'center', "$justifyContent": 'flex-end', "$gap": 8 },
                React.createElement(Button, Object.assign({ "data-testid": 'tend-ui-drawer-cancel-button', variant: 'secondary' }, cancelButtonProps, { onClick: (_a = cancelButtonProps === null || cancelButtonProps === void 0 ? void 0 : cancelButtonProps.onClick) !== null && _a !== void 0 ? _a : onCancel }), (cancelButtonProps === null || cancelButtonProps === void 0 ? void 0 : cancelButtonProps.children) || cancelText),
                React.createElement(Button, Object.assign({ "data-testid": 'tend-ui-drawer-ok-button' }, okButtonProps, { onClick: (_b = okButtonProps === null || okButtonProps === void 0 ? void 0 : okButtonProps.onClick) !== null && _b !== void 0 ? _b : onOk }), (okButtonProps === null || okButtonProps === void 0 ? void 0 : okButtonProps.children) || okText)));
        }
        return footer;
    }, [cancelButtonProps, cancelText, footer, okButtonProps, okText, onCancel, onOk]);
    const contentWrapperStyle = React.useMemo(() => ({
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
    const _styles = React.useMemo(() => (Object.assign(Object.assign({}, styles), { header: Object.assign(Object.assign({}, styles === null || styles === void 0 ? void 0 : styles.header), { borderBottom: 'none' }), body: Object.assign(Object.assign({}, styles === null || styles === void 0 ? void 0 : styles.body), { padding: '0 24px' }), footer: Object.assign(Object.assign({}, styles === null || styles === void 0 ? void 0 : styles.footer), { borderTop: 'none', padding: '16px 24px' }) })), [styles]);
    const [className, setClassName] = React.useState('');
    return (React.createElement(Root, Object.assign({ "data-testid": 'tend-ui-drawer' }, props, { "$theme": theme, styles: _styles, contentWrapperStyle: contentWrapperStyle, title: _title, footer: _footer, placement: placement, width: _width, height: _height, size: _size, closeIcon: closeIcon, classNames: { content: className } }),
        React.createElement(ScrollPosition, { onScrollPositionChange: React.useCallback(position => {
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

export { Drawer };
