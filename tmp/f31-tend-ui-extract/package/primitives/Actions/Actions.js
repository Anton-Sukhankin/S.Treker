import { __rest } from 'tslib';
import React from 'react';
import ReactDOM from 'react-dom';
import { useTranslation } from '@10d/tend-ui-locale/hooks/useTranslation';
import { useTheme } from '@10d/tend-ui-theme';
import { Text } from '@10d/tend-ui-typography';
import { Box } from '@10d/tend-ui-grid';
import { Button } from '@10d/tend-ui-primitives';
import { Badge } from '../Badge/Badge.js';
import { Root, Extra } from './styled.js';

const BaseActions = (_a, ref) => {
    var { visible, counter, counterText, okText, cancelText, okButtonProps, cancelButtonProps, onOk, onCancel, extra, offset } = _a, props = __rest(_a, ["visible", "counter", "counterText", "okText", "cancelText", "okButtonProps", "cancelButtonProps", "onOk", "onCancel", "extra", "offset"]);
    const t = useTranslation();
    const theme = useTheme();
    const isVisible = (() => {
        if (typeof visible === 'boolean')
            return visible;
        if (typeof counter === 'object')
            return typeof counter.inner === 'number' && counter.inner > 0;
        return typeof counter === 'number' && counter > 0;
    })();
    const extraNode = React.useMemo(() => {
        var _a, _b;
        if (!extra) {
            return (React.createElement(Box, { "$display": 'inline-flex', "$alignItems": 'center', "$gap": 12 },
                React.createElement(Button, Object.assign({ "data-testid": 'tend-ui-actions-cancel-button', variant: 'secondary' }, cancelButtonProps, { onClick: (_a = cancelButtonProps === null || cancelButtonProps === void 0 ? void 0 : cancelButtonProps.onClick) !== null && _a !== void 0 ? _a : onCancel }), (cancelButtonProps === null || cancelButtonProps === void 0 ? void 0 : cancelButtonProps.children) ||
                    cancelText ||
                    t(['primitives', 'Actions', 'cancel'])),
                React.createElement(Button, Object.assign({ "data-testid": 'tend-ui-actions-ok-button' }, okButtonProps, { onClick: (_b = okButtonProps === null || okButtonProps === void 0 ? void 0 : okButtonProps.onClick) !== null && _b !== void 0 ? _b : onOk }), (okButtonProps === null || okButtonProps === void 0 ? void 0 : okButtonProps.children) || okText || t(['primitives', 'Actions', 'accept']))));
        }
        if (Array.isArray(extra))
            return (React.createElement(Box, { "$display": 'inline-flex', "$alignItems": 'center', "$gap": 12 }, extra.map(node => node)));
        return extra;
    }, [cancelButtonProps, cancelText, extra, okButtonProps, okText, onCancel, onOk, t]);
    const badgeProps = React.useMemo(() => {
        if (typeof counter === 'object')
            return Object.assign({ preset: 'blue' }, counter);
        return { preset: 'blue', inner: counter };
    }, [counter]);
    return ReactDOM.createPortal(React.createElement(Root, Object.assign({ "data-testid": 'tend-ui-actions' }, props, { ref: ref, theme: theme, "$visible": isVisible, "$offset": offset }),
        React.createElement(Box, { "$display": 'flex', "$alignItems": 'center', "$gap": 4 },
            React.createElement(Text, { size: 'large', strong: true }, counterText !== null && counterText !== void 0 ? counterText : t(['primitives', 'Actions', 'selected'])),
            React.createElement(Badge, Object.assign({}, badgeProps))),
        React.createElement(Extra, null, extraNode)), document.body);
};
const Actions = React.forwardRef(BaseActions);
Actions.displayName = 'Actions';

export { Actions };
