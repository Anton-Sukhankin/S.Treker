import React from 'react';
import notification from 'antd-core/es/notification';
import { useTranslation } from '@10d/tend-ui-locale';
import { Sync } from '@10d/tend-ui-icons/Sync';
import { Cancel } from '@10d/tend-ui-icons/Cancel';
import { DoneCircle } from '@10d/tend-ui-icons/DoneCircle';
import { Error } from '@10d/tend-ui-icons/Error';
import { Info } from '@10d/tend-ui-icons/Info';
import { Close } from '@10d/tend-ui-icons/Close';
import { Tooltip } from '@10d/tend-ui-primitives';
import { Styles, Footer } from './styled.js';

function composeDescription(config) {
    if (!config.footer)
        return config.description;
    return (React.createElement(React.Fragment, null,
        config.description,
        React.createElement(Footer, null, config.footer.map(node => node))));
}
const CloseIcon = () => {
    const t = useTranslation();
    return (React.createElement(Tooltip, { title: t(['general', 'close']), zIndex: 3000 },
        React.createElement(Close, { size: 20 })));
};
function methodsFactory(executor) {
    return {
        init: () => {
            var _a;
            // Header 80px + margin 8px = 88
            (_a = executor.config) === null || _a === void 0 ? void 0 : _a.call(executor, { top: 88, placement: 'topRight', duration: 5 });
        },
        success: (config) => {
            executor.success(Object.assign(Object.assign({ icon: React.createElement(DoneCircle, { color: 'green500' }), closeIcon: React.createElement(CloseIcon, null) }, config), { description: composeDescription(config) }));
        },
        error: (config) => {
            executor.error(Object.assign(Object.assign({ icon: React.createElement(Cancel, { color: 'red600' }), closeIcon: React.createElement(CloseIcon, null) }, config), { description: composeDescription(config) }));
        },
        warning: (config) => {
            executor.warning(Object.assign(Object.assign({ icon: React.createElement(Error, { color: 'gold600' }), closeIcon: React.createElement(CloseIcon, null) }, config), { description: composeDescription(config) }));
        },
        info: (config) => {
            executor.info(Object.assign(Object.assign({ icon: React.createElement(Info, { color: 'blue600' }), closeIcon: React.createElement(CloseIcon, null) }, config), { description: composeDescription(config) }));
        },
        neutral: (config) => {
            executor.info(Object.assign(Object.assign({ icon: React.createElement(DoneCircle, { color: 'gray500' }), closeIcon: React.createElement(CloseIcon, null) }, config), { description: composeDescription(config), className: ['tend-ui-notification-notice-neutral', config.className]
                    .filter(Boolean)
                    .join(' ') }));
        },
        loading: (config) => {
            executor.open(Object.assign(Object.assign({ icon: React.createElement(Sync, { color: 'blue600' }), closeIcon: React.createElement(CloseIcon, null) }, config), { description: composeDescription(config), className: ['tend-ui-notification-notice-loading', config.className]
                    .filter(Boolean)
                    .join(' ') }));
        },
    };
}
const useToast = (config) => {
    const [methods, holder] = notification.useNotification(Object.assign({ 
        // Header 80px + margin 8px = 88
        top: 88, placement: 'topRight' }, config));
    const api = React.useMemo(() => (Object.assign(Object.assign({}, methods), methodsFactory(methods))), [methods]);
    return [api, holder];
};
const Toast = Object.assign({
    Styles,
    useToast,
    config: notification.config,
    destroy: notification.destroy,
}, methodsFactory(notification));

export { Toast };
