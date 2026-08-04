import React from 'react';
import { isUndefined } from '@10d/tend-ui-utils/isUndefined';
import { isString } from '@10d/tend-ui-utils/isString';
import { useTranslation } from '@10d/tend-ui-locale/hooks/useTranslation';
import { Box } from '@10d/tend-ui-grid';
import { Title, Paragraph, Text, Link } from '@10d/tend-ui-typography';
import { Button } from '@10d/tend-ui-primitives';
import { Layout } from '../Layout/Layout.js';
import { WhaleSad } from '../../WhaleSad.js';

const Forbidden = ({ title, description, onClick = () => {
    window.location.replace('/');
}, button, content, }) => {
    var _a;
    const t = useTranslation();
    const _title = isUndefined(title)
        ? t(['components', 'Status', 'Forbidden', 'title'])
        : title;
    const _description = isUndefined(description)
        ? t(['components', 'Status', 'Forbidden', 'description'])
        : description;
    return (React.createElement(Layout, null,
        React.createElement(Box, null,
            React.createElement(WhaleSad, null)),
        React.createElement(Box, { "$display": 'flex', "$flexDirection": 'column', "$gap": 16 },
            isString(_title) ? (React.createElement(Title, { level: 'h3', margin: '0' }, _title)) : (_title),
            isString(_description) ? (React.createElement(Paragraph, { margin: '0' }, _description)) : (_description),
            isUndefined(content) ? (React.createElement(React.Fragment, null,
                React.createElement(Box, { "$display": 'flex', "$flexDirection": 'column' },
                    React.createElement(Text, null,
                        t(['components', 'Status', 'phone']),
                        ":\u00A0",
                        React.createElement(Link, { href: 'tel:+7-495-660-41-41' }, "+7-495-660-41-41"))),
                React.createElement(Text, { size: 'small', color: 'gray650' }, t(['components', 'Status', 'schedule'])))) : (content),
            React.createElement(Button, Object.assign({ onClick: onClick }, button), (_a = button === null || button === void 0 ? void 0 : button.children) !== null && _a !== void 0 ? _a : t(['components', 'Status', 'button'])))));
};

export { Forbidden };
