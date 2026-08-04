import React from 'react';
import { DefaultTheme } from 'styled-components';
import { SelectProps as AntSelectProps, BaseOptionType, DefaultOptionType } from 'antd-core/es/select';
import { SelectRef } from './types';
export declare const ArrowIcon: import("styled-components").StyledComponent<React.ForwardRefExoticComponent<Omit<import("@tend-ui-icons/types").IconProps, "children"> & React.RefAttributes<HTMLSpanElement>>, DefaultTheme, {
    $open: boolean;
    $disabled?: boolean;
}, never>;
type RootProps = {
    $theme: DefaultTheme;
    $multi?: boolean;
    $fullWidth?: boolean;
    $width?: string;
};
export declare const Root: <ValueType, OptionType extends BaseOptionType | DefaultOptionType = DefaultOptionType>(props: AntSelectProps<ValueType, OptionType> & RootProps & {
    ref?: React.ForwardedRef<SelectRef>;
}) => React.ReactElement;
export {};
