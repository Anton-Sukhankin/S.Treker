import React from 'react';
import { GenericObject } from '../../../types/GenericObject';
import { InputProps } from '../../../primitives/Input';
import { CheckBoxGroupProps, CheckboxProps } from '../../../primitives/Checkbox';
import { CheckboxGroupSearchProps } from '../../../components/CheckboxGroupSearch';
import { DatePickerProps } from '../../../primitives/DatePicker';
import { RangePickerProps } from '../../../primitives/RangePicker';
import { ToggleProps } from '../../../primitives/Toggle';
import { RadioGroupProps, RadioProps } from '../../../primitives/Radio';
import { RadioGroupSearchProps } from '../../../components/RadioGroupSearch';
import { SelectProps } from '../../../primitives/Select';
import { AsyncSelectProps } from '../../../components/AsyncSelect';
import { AsyncCheckboxProps } from '../../../components/AsyncCheckbox';
import { AsyncRadioProps } from '../../../components/AsyncRadio';
import { InputNumberProps } from '../../../primitives/InputNumber';
export type FilterValue = GenericObject;
type InputFilter = InputProps & {
    component: 'input';
};
type InputNumberFilter = InputNumberProps<any> & {
    component: 'input-number';
};
type SelectFilter = SelectProps & {
    component: 'select';
};
type AsyncSelectFilter = AsyncSelectProps & {
    component: 'async-select';
};
type AsyncCheckboxGroupFilter = AsyncCheckboxProps & {
    component: 'async-checkbox';
};
type AsyncRadioGroupFilter = AsyncRadioProps & {
    component: 'async-radio';
};
type CheckboxFilter = CheckboxProps & {
    component: 'checkbox';
};
type CheckboxGroupFilter = CheckBoxGroupProps & {
    component: 'checkbox-group';
};
type CheckboxGroupSearchFilter = CheckboxGroupSearchProps & {
    component: 'checkbox-group-search';
};
type RadioFilter = RadioProps & {
    component: 'radio';
};
type RadioGroupFilter = RadioGroupProps & {
    component: 'radio-group';
};
type RadioGroupSearchFilter = RadioGroupSearchProps & {
    component: 'radio-group-search';
};
type DatePickerFilter = DatePickerProps & {
    component: 'date-picker';
};
type RangePickerFilter = RangePickerProps & {
    component: 'range-picker';
};
type ToggleFilter = ToggleProps & {
    component: 'toggle';
};
export type FilterComponent = InputFilter | InputNumberFilter | SelectFilter | AsyncSelectFilter | AsyncCheckboxGroupFilter | AsyncRadioGroupFilter | CheckboxFilter | CheckboxGroupFilter | CheckboxGroupSearchFilter | DatePickerFilter | ToggleFilter | RangePickerFilter | RadioFilter | RadioGroupFilter | RadioGroupSearchFilter;
export type FilterConfig = {
    /**
     * `React.key`
     */
    key?: React.Key;
    /**
     * Уникальный идентификатор фильтра
     */
    id: string;
    /**
     * Имя фильтра
     */
    name: string;
    /**
     * Лейбл в списке
     */
    label?: React.ReactNode;
    /**
     * Тип фильтра
     * `Input`, `Select`, `Search`, `Checkbox`, `Radio`
     */
    component: FilterComponent;
    depends?: string[];
    /**
     * Массив зависимостей.
     * Если один фильтр должен недоступен пока не выбран другой,
     * то используйте это свойство
     */
    requires?: string[];
};
export type FilterPreset = {
    id: string;
    label: string;
    value: GenericObject;
};
export {};
