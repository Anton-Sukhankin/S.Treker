import React from 'react';
import AntSelect, { SelectProps as AntSelectProps, BaseOptionType, DefaultOptionType } from 'antd-core/es/select';
import { BaseInputProps } from '../../types/BaseInputProps';
type SelectRef = React.ElementRef<typeof AntSelect>;
type BaseSelectProps = {
    width?: string;
    fullWidth?: boolean;
    customSuffixIcon?: React.ReactNode;
    optionDescription?: string | ((option: Pick<DefaultOptionType, 'value' | 'label'>) => string);
};
type SelectProps<ValueType = any, OptionType extends BaseOptionType | DefaultOptionType = DefaultOptionType> = Omit<AntSelectProps<ValueType, OptionType>, 'suffixIcon' | 'removeIcon' | 'allowClear' | 'size'> & BaseInputProps & BaseSelectProps;
type SelectComponent = (<ValueType, OptionType extends BaseOptionType | DefaultOptionType = DefaultOptionType>(props: SelectProps<ValueType, OptionType> & {
    ref?: React.ForwardedRef<SelectRef>;
}) => React.JSX.Element) & Pick<React.FC, 'displayName'>;
export type { SelectRef, SelectProps, SelectComponent, BaseOptionType, DefaultOptionType, };
