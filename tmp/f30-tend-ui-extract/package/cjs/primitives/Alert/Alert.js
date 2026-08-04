'use strict';

var tslib = require('tslib');
var React = require('react');
var tendUiStyling = require('@10d/tend-ui-styling');
var isUndefined = require('@10d/tend-ui-utils/isUndefined');
var tendUiLocale = require('@10d/tend-ui-locale');
var Close = require('@10d/tend-ui-icons/Close');
var Sync = require('@10d/tend-ui-icons/Sync');
var Cancel = require('@10d/tend-ui-icons/Cancel');
var DoneCircle = require('@10d/tend-ui-icons/DoneCircle');
var Error = require('@10d/tend-ui-icons/Error');
var Info = require('@10d/tend-ui-icons/Info');
var tendUiUtils = require('@10d/tend-ui-utils');
var tendUiTypography = require('@10d/tend-ui-typography');
var tendUiTheme = require('@10d/tend-ui-theme');
var tendUiGrid = require('@10d/tend-ui-grid');
var tendUiPrimitives = require('@10d/tend-ui-primitives');
var styled = require('./styled.js');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

const BaseAlert = (_a, ref) => {
    var { border = false, showIcon = true, closable = false, type = 'info', message, description, onClose, closeIcon, icon, footer, closeIconTooltip, action } = _a, props = tslib.__rest(_a, ["border", "showIcon", "closable", "type", "message", "description", "onClose", "closeIcon", "icon", "footer", "closeIconTooltip", "action"]);
    const t = tendUiLocale.useTranslation();
    const theme = tendUiTheme.useTheme();
    const [visible, setVisible] = React__default["default"].useState(true);
    const _b = tendUiStyling.extractMarginProps(props), { rest } = _b, margins = tslib.__rest(_b, ["rest"]);
    if (process.env.NODE_ENV === 'development') {
        if (type === 'neutral' || type === 'loading') {
            tendUiUtils.INTERNAL_TendUILogger.warning([
                `<Alert type="${type}" /> удален из Figma и будет удален в следующем мажоре.`,
            ]);
        }
        if (border) {
            tendUiUtils.INTERNAL_TendUILogger.warning([
                `<Alert border={true} /> удален из Figma и будет удален следующем мажоре.`,
            ]);
        }
    }
    const handleCloseClick = React__default["default"].useCallback((e) => {
        setVisible(false);
        onClose === null || onClose === void 0 ? void 0 : onClose(e);
    }, [onClose]);
    const iconNode = React__default["default"].useMemo(() => {
        if (isUndefined.isUndefined(icon))
            return {
                success: React__default["default"].createElement(DoneCircle.DoneCircle, { color: 'green500', size: 20 }),
                error: React__default["default"].createElement(Cancel.Cancel, { color: 'red600', size: 20 }),
                warning: React__default["default"].createElement(Error.Error, { color: 'gold600', size: 20 }),
                info: React__default["default"].createElement(Info.Info, { size: 20, color: 'blue600' }),
                /**
                 * @deprecated Устарело начиная с `4.11.0`
                 */
                neutral: React__default["default"].createElement(Info.Info, { size: 20, color: 'gray400' }),
                /**
                 * @deprecated Устарело начиная с `4.11.0`
                 */
                loading: React__default["default"].createElement(Sync.Sync, { size: 20, color: 'gray400' }),
            }[type];
        return icon;
    }, [icon, type]);
    const closeIconNode = React__default["default"].useMemo(() => {
        if (typeof closeIcon === 'undefined')
            return React__default["default"].createElement(Close.Close, { size: 20 });
        return closeIcon;
    }, [closeIcon]);
    const footerNode = React__default["default"].useMemo(() => {
        if (isUndefined.isUndefined(footer))
            return null;
        if (Array.isArray(footer))
            return (React__default["default"].createElement(tendUiGrid.Box, { "$display": 'flex', "$gap": 8, "$margin": '12px 0 0' }, footer.map(node => node)));
        return React__default["default"].createElement(tendUiGrid.Box, { "$margin": '12px 0 0' }, footer);
    }, [footer]);
    const tooltipProps = React__default["default"].useMemo(() => {
        if (!closeIconTooltip)
            return { title: t(['general', 'close']) };
        return closeIconTooltip;
    }, [closeIconTooltip, t]);
    const contentNode = React__default["default"].useMemo(() => {
        if (message && description) {
            return (React__default["default"].createElement(React__default["default"].Fragment, null,
                React__default["default"].createElement(tendUiTypography.Title, { margin: '0', level: 'h6' }, message),
                React__default["default"].createElement(tendUiTypography.Paragraph, { margin: '0' }, description)));
        }
        return React__default["default"].createElement(tendUiTypography.Paragraph, { margin: '0' }, message || description);
    }, [description, message]);
    if (!visible)
        return null;
    return (React__default["default"].createElement(styled.Root, Object.assign({ "data-testid": 'tend-ui-alert' }, rest, margins, { ref: ref, theme: theme, "$type": type, "$border": border, className: 'tend-ui-alert-root' }),
        showIcon && (React__default["default"].createElement(tendUiGrid.Box, { "$display": 'flex', "$padding": '2px', className: 'tend-ui-alert-icon' }, iconNode)),
        React__default["default"].createElement(tendUiGrid.Box, { "$flex": 1, className: 'tend-ui-alert-content' },
            contentNode,
            footerNode),
        action && (React__default["default"].createElement(styled.Action, { className: 'tend-ui-alert-action', theme: theme }, action)),
        closable && (React__default["default"].createElement(tendUiPrimitives.Tooltip, Object.assign({}, tooltipProps),
            React__default["default"].createElement(styled.CloseButton, { theme: theme, className: 'tend-ui-alert-close-button', onClick: handleCloseClick }, closeIconNode)))));
};
const Alert = React__default["default"].forwardRef(BaseAlert);
Alert.displayName = 'Alert';

exports.Alert = Alert;
