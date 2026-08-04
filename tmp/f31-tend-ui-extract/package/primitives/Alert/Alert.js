import { __rest } from 'tslib';
import React from 'react';
import { extractMarginProps } from '@10d/tend-ui-styling';
import { isUndefined } from '@10d/tend-ui-utils/isUndefined';
import { useTranslation } from '@10d/tend-ui-locale';
import { Close } from '@10d/tend-ui-icons/Close';
import { Sync } from '@10d/tend-ui-icons/Sync';
import { Cancel } from '@10d/tend-ui-icons/Cancel';
import { DoneCircle } from '@10d/tend-ui-icons/DoneCircle';
import { Error } from '@10d/tend-ui-icons/Error';
import { Info } from '@10d/tend-ui-icons/Info';
import { INTERNAL_TendUILogger } from '@10d/tend-ui-utils';
import { Title, Paragraph } from '@10d/tend-ui-typography';
import { useTheme } from '@10d/tend-ui-theme';
import { Box } from '@10d/tend-ui-grid';
import { Tooltip } from '@10d/tend-ui-primitives';
import { Root, Action, CloseButton } from './styled.js';

const BaseAlert = (_a, ref) => {
    var { border = false, showIcon = true, closable = false, type = 'info', message, description, onClose, closeIcon, icon, footer, closeIconTooltip, action } = _a, props = __rest(_a, ["border", "showIcon", "closable", "type", "message", "description", "onClose", "closeIcon", "icon", "footer", "closeIconTooltip", "action"]);
    const t = useTranslation();
    const theme = useTheme();
    const [visible, setVisible] = React.useState(true);
    const _b = extractMarginProps(props), { rest } = _b, margins = __rest(_b, ["rest"]);
    if (process.env.NODE_ENV === 'development') {
        if (type === 'neutral' || type === 'loading') {
            INTERNAL_TendUILogger.warning([
                `<Alert type="${type}" /> удален из Figma и будет удален в следующем мажоре.`,
            ]);
        }
        if (border) {
            INTERNAL_TendUILogger.warning([
                `<Alert border={true} /> удален из Figma и будет удален следующем мажоре.`,
            ]);
        }
    }
    const handleCloseClick = React.useCallback((e) => {
        setVisible(false);
        onClose === null || onClose === void 0 ? void 0 : onClose(e);
    }, [onClose]);
    const iconNode = React.useMemo(() => {
        if (isUndefined(icon))
            return {
                success: React.createElement(DoneCircle, { color: 'green500', size: 20 }),
                error: React.createElement(Cancel, { color: 'red600', size: 20 }),
                warning: React.createElement(Error, { color: 'gold600', size: 20 }),
                info: React.createElement(Info, { size: 20, color: 'blue600' }),
                /**
                 * @deprecated Устарело начиная с `4.11.0`
                 */
                neutral: React.createElement(Info, { size: 20, color: 'gray400' }),
                /**
                 * @deprecated Устарело начиная с `4.11.0`
                 */
                loading: React.createElement(Sync, { size: 20, color: 'gray400' }),
            }[type];
        return icon;
    }, [icon, type]);
    const closeIconNode = React.useMemo(() => {
        if (typeof closeIcon === 'undefined')
            return React.createElement(Close, { size: 20 });
        return closeIcon;
    }, [closeIcon]);
    const footerNode = React.useMemo(() => {
        if (isUndefined(footer))
            return null;
        if (Array.isArray(footer))
            return (React.createElement(Box, { "$display": 'flex', "$gap": 8, "$margin": '12px 0 0' }, footer.map(node => node)));
        return React.createElement(Box, { "$margin": '12px 0 0' }, footer);
    }, [footer]);
    const tooltipProps = React.useMemo(() => {
        if (!closeIconTooltip)
            return { title: t(['general', 'close']) };
        return closeIconTooltip;
    }, [closeIconTooltip, t]);
    const contentNode = React.useMemo(() => {
        if (message && description) {
            return (React.createElement(React.Fragment, null,
                React.createElement(Title, { margin: '0', level: 'h6' }, message),
                React.createElement(Paragraph, { margin: '0' }, description)));
        }
        return React.createElement(Paragraph, { margin: '0' }, message || description);
    }, [description, message]);
    if (!visible)
        return null;
    return (React.createElement(Root, Object.assign({ "data-testid": 'tend-ui-alert' }, rest, margins, { ref: ref, theme: theme, "$type": type, "$border": border, className: 'tend-ui-alert-root' }),
        showIcon && (React.createElement(Box, { "$display": 'flex', "$padding": '2px', className: 'tend-ui-alert-icon' }, iconNode)),
        React.createElement(Box, { "$flex": 1, className: 'tend-ui-alert-content' },
            contentNode,
            footerNode),
        action && (React.createElement(Action, { className: 'tend-ui-alert-action', theme: theme }, action)),
        closable && (React.createElement(Tooltip, Object.assign({}, tooltipProps),
            React.createElement(CloseButton, { theme: theme, className: 'tend-ui-alert-close-button', onClick: handleCloseClick }, closeIconNode)))));
};
const Alert = React.forwardRef(BaseAlert);
Alert.displayName = 'Alert';

export { Alert };
