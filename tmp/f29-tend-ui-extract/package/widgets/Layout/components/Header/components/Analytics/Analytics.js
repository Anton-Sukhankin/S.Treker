import React from 'react';
import { useTranslation } from '@10d/tend-ui-locale/hooks/useTranslation';
import { BarChart } from '@10d/tend-ui-icons/BarChart';
import { ToggleButton, Tooltip } from '@10d/tend-ui-primitives';

const Analytics = ({ component: Component, href }) => {
    const t = useTranslation();
    const button = (React.createElement(ToggleButton, { selectable: false, "aria-disabled": !Component && !href },
        React.createElement(BarChart, { color: 'gray900', size: 20 })));
    return (React.createElement(Tooltip, { title: t(['widgets', 'Layout', 'Header', 'analytics']) }, Component ? (React.createElement(Component, null, button)) : href ? (React.createElement("a", { href: href, target: '_blank', rel: 'noreferrer' }, button)) : (button)));
};
Analytics.displayName = 'Layout.Header.Analytics';

export { Analytics };
