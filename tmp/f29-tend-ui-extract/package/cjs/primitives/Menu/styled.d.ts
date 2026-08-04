import React from 'react';
import { MenuProps } from 'antd-core/es/menu';
import { DefaultTheme } from 'styled-components';
import { MenuRef } from './types';
type RootProps = {
    $theme: DefaultTheme;
};
export declare const Root: (props: MenuProps & RootProps & {
    ref?: React.ForwardedRef<MenuRef>;
}) => React.ReactElement;
export {};
