'use strict';

var React = require('react');
var notification = require('antd-core/es/notification');
var tendUiLocale = require('@10d/tend-ui-locale');
var Sync = require('@10d/tend-ui-icons/Sync');
var Cancel = require('@10d/tend-ui-icons/Cancel');
var DoneCircle = require('@10d/tend-ui-icons/DoneCircle');
var Error = require('@10d/tend-ui-icons/Error');
var Info = require('@10d/tend-ui-icons/Info');
var Close = require('@10d/tend-ui-icons/Close');
var tendUiPrimitives = require('@10d/tend-ui-primitives');
var styled = require('./styled.js');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);
var notification__default = /*#__PURE__*/_interopDefault(notification);

function composeDescription(config) {
    if (!config.footer)
        return config.description;
    return (React__default["default"].createElement(React__default["default"].Fragment, null,
        config.description,
        React__default["default"].createElement(styled.Footer, null, config.footer.map(node => node))));
}
const CloseIcon = () => {
    const t = tendUiLocale.useTranslation();
    return (React__default["default"].createElement(tendUiPrimitives.Tooltip, { title: t(['general', 'close']), zIndex: 3000 },
        React__default["default"].createElement(Close.Close, { size: 20 })));
};
function methodsFactory(executor) {
    return {
        init: () => {
            var _a;
            // Header 80px + margin 8px = 88
            (_a = executor.config) === null || _a === void 0 ? void 0 : _a.call(executor, { top: 88, placement: 'topRight', duration: 5 });
        },
        success: (config) => {
            executor.success(Object.assign(Object.assign({ icon: React__default["default"].createElement(DoneCircle.DoneCircle, { color: 'green500' }), closeIcon: React__default["default"].createElement(CloseIcon, null) }, config), { description: composeDescription(config) }));
        },
        error: (config) => {
            executor.error(Object.assign(Object.assign({ icon: React__default["default"].createElement(Cancel.Cancel, { color: 'red600' }), closeIcon: React__default["default"].createElement(CloseIcon, null) }, config), { description: composeDescription(config) }));
        },
        warning: (config) => {
            executor.warning(Object.assign(Object.assign({ icon: React__default["default"].createElement(Error.Error, { color: 'gold600' }), closeIcon: React__default["default"].createElement(CloseIcon, null) }, config), { description: composeDescription(config) }));
        },
        info: (config) => {
            executor.info(Object.assign(Object.assign({ icon: React__default["default"].createElement(Info.Info, { color: 'blue600' }), closeIcon: React__default["default"].createElement(CloseIcon, null) }, config), { description: composeDescription(config) }));
        },
        neutral: (config) => {
            executor.info(Object.assign(Object.assign({ icon: React__default["default"].createElement(DoneCircle.DoneCircle, { color: 'gray500' }), closeIcon: React__default["default"].createElement(CloseIcon, null) }, config), { description: composeDescription(config), className: ['tend-ui-notification-notice-neutral', config.className]
                    .filter(Boolean)
                    .join(' ') }));
        },
        loading: (config) => {
            executor.open(Object.assign(Object.assign({ icon: React__default["default"].createElement(Sync.Sync, { color: 'blue600' }), closeIcon: React__default["default"].createElement(CloseIcon, null) }, config), { description: composeDescription(config), className: ['tend-ui-notification-notice-loading', config.className]
                    .filter(Boolean)
                    .join(' ') }));
        },
    };
}
const useToast = (config) => {
    const [methods, holder] = notification__default["default"].useNotification(Object.assign({ 
        // Header 80px + margin 8px = 88
        top: 88, placement: 'topRight' }, config));
    const api = React__default["default"].useMemo(() => (Object.assign(Object.assign({}, methods), methodsFactory(methods))), [methods]);
    return [api, holder];
};
const Toast = Object.assign({
    Styles: styled.Styles,
    useToast,
    config: notification__default["default"].config,
    destroy: notification__default["default"].destroy,
}, methodsFactory(notification__default["default"]));

exports.Toast = Toast;
