import React from 'react';
import AntConfigProvider from 'antd-core/es/config-provider';
import { useLocale } from '@10d/tend-ui-locale';
import { useTheme } from '@10d/tend-ui-theme';
import { createAntdTheme } from './utils.js';

const ConfigProvider = ({ children }) => {
    const theme = useTheme();
    const locale = useLocale();
    return (React.createElement(AntConfigProvider, { prefixCls: 'tend-ui', locale: locale, theme: createAntdTheme(theme) }, children));
};

export { ConfigProvider };
