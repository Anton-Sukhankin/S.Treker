import React from 'react';
import { useTranslation } from '@10d/tend-ui-locale/hooks/useTranslation';
import { Chat } from '@10d/tend-ui-icons/Chat';
import { Tooltip, ToggleButton } from '@10d/tend-ui-primitives';

const ChatButton = (props) => {
    const t = useTranslation();
    return (React.createElement(Tooltip, { title: t(['widgets', 'Layout', 'Header', 'chat']) },
        React.createElement(ToggleButton, Object.assign({}, props),
            React.createElement(Chat, { color: 'gray900', size: 20 }))));
};
ChatButton.displayName = 'Layout.Header.ChatButton';

export { ChatButton };
