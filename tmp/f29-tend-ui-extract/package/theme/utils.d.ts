import { ThemeConfig } from 'antd-core/es/config-provider';
import { DefaultTheme } from 'styled-components';
import { ThemeSchema } from './types/ThemeSchema';
import { Colors } from './types/Colors';
import { Tokens } from './types/Tokens';
export declare const themeFactory: (colors: Colors, tokens: Tokens) => ThemeSchema;
export declare const createAntdTheme: ({ colors }: DefaultTheme) => ThemeConfig;
