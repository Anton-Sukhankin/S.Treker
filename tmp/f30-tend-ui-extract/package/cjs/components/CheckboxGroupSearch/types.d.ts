import React from 'react';
import { CheckBoxGroupProps, CheckboxOptionType } from '../../primitives/Checkbox';
import { FilterOption } from '../../hooks/useFilterOption';
export type CheckboxGroupSearchOptionType = CheckboxOptionType;
type BaseCheckboxGroupSearchProps = {
    virtual?: boolean;
    error?: boolean;
    loading?: boolean;
    showSearch?: boolean;
    allowClear?: boolean;
    scrollable?: boolean;
    optionRender?: (option: CheckboxGroupSearchOptionType) => React.ReactNode;
    optionAfter?: React.ReactNode | ((option: CheckboxGroupSearchOptionType) => React.ReactNode);
    /**
     * Свойство позволяет задать `description` для каждой опции
     */
    optionDescription?: string | ((option: CheckboxGroupSearchOptionType) => string);
    placeholder?: string;
    filterOption?: boolean | FilterOption;
    filterOptionProp?: string;
    options?: CheckboxGroupSearchOptionType[];
    onSearch?: (value: string) => void;
    onScroll?: React.UIEventHandler<HTMLDivElement>;
};
export type CheckboxGroupSearchProps = Omit<CheckBoxGroupProps, 'options'> & BaseCheckboxGroupSearchProps;
export {};
