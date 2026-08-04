import React from 'react';
import { FormProps as AntFormProps } from 'antd-core/es/form';
import { FormRef } from './types';
type RootProps = {
    $gap?: number;
};
export declare const Root: <T>(props: AntFormProps<T> & RootProps & {
    ref?: React.ForwardedRef<FormRef<T>>;
}) => React.ReactElement;
export {};
