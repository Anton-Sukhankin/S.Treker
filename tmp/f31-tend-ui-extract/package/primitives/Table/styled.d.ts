import React from 'react';
import { TableProps as AntTableProps } from 'antd-core/es/table';
import { DefaultTheme } from 'styled-components';
import { TableRef } from './types';
type RootProps = {
    $theme: DefaultTheme;
    $size: 'large' | 'medium' | 'small';
    $pointer: boolean;
};
export declare const Root: <T>(props: RootProps & AntTableProps<T> & {
    ref?: React.ForwardedRef<TableRef>;
}) => React.ReactElement;
export {};
