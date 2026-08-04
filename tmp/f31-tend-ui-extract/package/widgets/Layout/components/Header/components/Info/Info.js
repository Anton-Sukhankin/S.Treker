import React from 'react';
import { useTranslation } from '@10d/tend-ui-locale/hooks/useTranslation';
import { Book } from '@10d/tend-ui-icons/Book';
import { ToggleButton, Tooltip } from '@10d/tend-ui-primitives';

const Info = ({ component: Component, href }) => {
    const t = useTranslation();
    const button = (React.createElement(ToggleButton, { selectable: false, "aria-disabled": !Component && !href },
        React.createElement(Book, { color: 'gray900', size: 20 })));
    return (React.createElement(Tooltip, { title: t(['widgets', 'Layout', 'Header', 'info']) }, Component ? (React.createElement(Component, null, button)) : href ? (React.createElement("a", { href: href, target: '_blank', rel: 'noreferrer' }, button)) : (button)));
};
Info.displayName = 'Layout.Header.Info';

export { Info };
