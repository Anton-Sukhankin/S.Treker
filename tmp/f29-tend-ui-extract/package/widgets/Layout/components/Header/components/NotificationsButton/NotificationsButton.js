import React from 'react';
import { useTranslation } from '@10d/tend-ui-locale/hooks/useTranslation';
import { Notification } from '@10d/tend-ui-icons/Notification';
import { Tooltip, ToggleButton } from '@10d/tend-ui-primitives';

const NotificationsButton = (props) => {
    const t = useTranslation();
    return (React.createElement(Tooltip, { title: t(['widgets', 'Layout', 'Header', 'notifications']) },
        React.createElement(ToggleButton, Object.assign({}, props),
            React.createElement(Notification, { color: 'gray900', size: 20 }))));
};
NotificationsButton.displayName = 'Layout.Header.NotificationsButton';

export { NotificationsButton };
