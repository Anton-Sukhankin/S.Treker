'use strict';

var tslib = require('tslib');
var React = require('react');
var useTranslation = require('@10d/tend-ui-locale/hooks/useTranslation');
var Sync = require('@10d/tend-ui-icons/Sync');
var Close = require('@10d/tend-ui-icons/Close');
var tendUiTheme = require('@10d/tend-ui-theme');
var tendUiPrimitives = require('@10d/tend-ui-primitives');
var styled = require('./styled.js');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

const typeMap = {
    success: 'success',
    error: 'error',
    info: 'info',
    warning: 'warning',
    loading: undefined,
    neutral: undefined,
};
/**
 * @deprecated Component has been deprecated and will be removed in next major version
 * Use "primitives/Alert" component instead
 */
const Alert = (_a) => {
    var { type = 'info', border = true, footer, closeIconTooltip } = _a, props = tslib.__rest(_a, ["type", "border", "footer", "closeIconTooltip"]);
    const theme = tendUiTheme.useTheme();
    const t = useTranslation.useTranslation();
    const typeProp = typeMap[type];
    const iconProp = type === 'loading' ? React__default["default"].createElement(Sync.Sync, { size: 20 }) : undefined;
    const [message, description] = React__default["default"].useMemo(() => {
        if (!(footer === null || footer === void 0 ? void 0 : footer.length))
            return [props.message, props.description];
        const extra = React__default["default"].createElement(styled.Footer, null, footer.map(node => node));
        if (props.description) {
            return [
                props.message,
                React__default["default"].createElement(React__default["default"].Fragment, null,
                    props.description,
                    extra),
            ];
        }
        return [
            React__default["default"].createElement(React__default["default"].Fragment, null,
                props.message,
                extra),
            props.description,
        ];
    }, [footer, props.message, props.description]);
    const tooltipProps = React__default["default"].useMemo(() => {
        if (!closeIconTooltip)
            return { title: t(['general', 'close']) };
        return closeIconTooltip;
    }, [closeIconTooltip, t]);
    return (React__default["default"].createElement(styled.Root, Object.assign({ "data-testid": 'tend-ui-alert' }, props, { "$theme": theme, "$type": type, "$border": border, showIcon: true, type: typeProp, icon: iconProp, message: message, description: description, closeIcon: React__default["default"].createElement(tendUiPrimitives.Tooltip, Object.assign({}, tooltipProps),
            React__default["default"].createElement(Close.Close, { size: 16 })) })));
};
Alert.displayName = 'Alert';

exports.Alert = Alert;
