import { __rest } from 'tslib';
import React from 'react';
import { useTranslation } from '@10d/tend-ui-locale/hooks/useTranslation';
import { Sync } from '@10d/tend-ui-icons/Sync';
import { Close } from '@10d/tend-ui-icons/Close';
import { useTheme } from '@10d/tend-ui-theme';
import { Tooltip } from '@10d/tend-ui-primitives';
import { Footer, Root } from './styled.js';

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
    var { type = 'info', border = true, footer, closeIconTooltip } = _a, props = __rest(_a, ["type", "border", "footer", "closeIconTooltip"]);
    const theme = useTheme();
    const t = useTranslation();
    const typeProp = typeMap[type];
    const iconProp = type === 'loading' ? React.createElement(Sync, { size: 20 }) : undefined;
    const [message, description] = React.useMemo(() => {
        if (!(footer === null || footer === void 0 ? void 0 : footer.length))
            return [props.message, props.description];
        const extra = React.createElement(Footer, null, footer.map(node => node));
        if (props.description) {
            return [
                props.message,
                React.createElement(React.Fragment, null,
                    props.description,
                    extra),
            ];
        }
        return [
            React.createElement(React.Fragment, null,
                props.message,
                extra),
            props.description,
        ];
    }, [footer, props.message, props.description]);
    const tooltipProps = React.useMemo(() => {
        if (!closeIconTooltip)
            return { title: t(['general', 'close']) };
        return closeIconTooltip;
    }, [closeIconTooltip, t]);
    return (React.createElement(Root, Object.assign({ "data-testid": 'tend-ui-alert' }, props, { "$theme": theme, "$type": type, "$border": border, showIcon: true, type: typeProp, icon: iconProp, message: message, description: description, closeIcon: React.createElement(Tooltip, Object.assign({}, tooltipProps),
            React.createElement(Close, { size: 16 })) })));
};
Alert.displayName = 'Alert';

export { Alert };
