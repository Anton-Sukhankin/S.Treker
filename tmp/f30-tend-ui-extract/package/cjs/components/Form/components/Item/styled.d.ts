import React from 'react';
import { DefaultTheme } from 'styled-components';
import { FormItemProps as AntFormItemProps } from 'antd-core/es/form';
type Props = {
    $theme: DefaultTheme;
    $width?: number | string;
};
type RootComponent = <T = any>(props: AntFormItemProps<T> & Props) => React.ReactElement;
export declare const Root: RootComponent;
export {};
