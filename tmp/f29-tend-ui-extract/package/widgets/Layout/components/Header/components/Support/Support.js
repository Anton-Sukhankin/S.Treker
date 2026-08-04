import React from 'react';
import { useTranslation } from '@10d/tend-ui-locale/hooks/useTranslation';
import { HeadphoneSupport } from '@10d/tend-ui-icons/HeadphoneSupport';
import { ToggleButton, Tooltip } from '@10d/tend-ui-primitives';

const Support = ({ component: Component, href }) => {
    const t = useTranslation();
    const button = (React.createElement(ToggleButton, { selectable: false, "aria-disabled": !Component && !href },
        React.createElement(HeadphoneSupport, { color: 'gray900', size: 20 })));
    return (React.createElement(Tooltip, { title: t(['widgets', 'Layout', 'Header', 'support']) }, Component ? (React.createElement(Component, null, button)) : href ? (React.createElement("a", { href: href, target: '_blank', rel: 'noreferrer' }, button)) : (button)));
};
Support.displayName = 'Layout.Header.Support';

export { Support };
