import React, { useCallback } from 'react';
import { Text } from '@10d/tend-ui-typography';
import message from 'antd-core/lib/message';
import { Tooltip } from '@10d/tend-ui-primitives';
import { useTheme } from '@10d/tend-ui-theme';
import { Copy } from '@10d/tend-ui-icons/Copy';
import { CopyContainer } from './styled.js';

const CopyEmail = ({ email }) => {
    const theme = useTheme();
    const handleCopyClick = useCallback(() => {
        navigator.clipboard.writeText(email).then(() => message.success('Скопировано'));
    }, [email]);
    return (React.createElement(CopyContainer, { theme: theme, "$display": 'flex', "$alignItems": 'center', "$gap": 4 },
        React.createElement(Text, { color: 'gray400' }, email),
        React.createElement(Tooltip, { title: '\u0421\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C' },
            React.createElement(Copy, { onClick: handleCopyClick }))));
};

export { CopyEmail };
