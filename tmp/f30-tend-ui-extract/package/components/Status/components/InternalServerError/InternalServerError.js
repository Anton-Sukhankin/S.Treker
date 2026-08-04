import React from 'react';
import { isUndefined } from '@10d/tend-ui-utils/isUndefined';
import { isString } from '@10d/tend-ui-utils/isString';
import { useTranslation } from '@10d/tend-ui-locale/hooks/useTranslation';
import { Box } from '@10d/tend-ui-grid';
import { Title, Paragraph } from '@10d/tend-ui-typography';
import { Button } from '@10d/tend-ui-primitives';
import { Layout } from '../Layout/Layout.js';
import { WhaleSad } from '../../WhaleSad.js';

const InternalServerError = ({ title, description, onClick = () => {
    window.location.reload();
}, button, }) => {
    var _a;
    const t = useTranslation();
    const _title = isUndefined(title)
        ? t(['components', 'Status', 'InternalServerError', 'title'])
        : title;
    const _description = isUndefined(description)
        ? t(['components', 'Status', 'InternalServerError', 'description'])
        : description;
    return (React.createElement(Layout, null,
        React.createElement(Box, null,
            React.createElement(WhaleSad, null)),
        React.createElement(Box, { "$display": 'flex', "$flexDirection": 'column', "$gap": 16 },
            isString(_title) ? (React.createElement(Title, { level: 'h3', margin: '0' }, _title)) : (_title),
            isString(_description) ? (React.createElement(Paragraph, { margin: '0' }, _description)) : (_description),
            React.createElement(Button, Object.assign({ onClick: onClick }, button), (_a = button === null || button === void 0 ? void 0 : button.children) !== null && _a !== void 0 ? _a : t(['components', 'Status', 'button'])))));
};

export { InternalServerError };
