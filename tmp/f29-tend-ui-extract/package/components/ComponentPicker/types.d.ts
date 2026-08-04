import { InputProps } from '../../primitives/Input';
import { CheckBoxGroupProps, CheckboxProps } from '../../primitives/Checkbox';
import { DatePickerProps } from '../../primitives/DatePicker';
import { RangePickerProps } from '../../primitives/RangePicker';
import { ToggleProps } from '../../primitives/Toggle';
import { RadioGroupProps, RadioProps } from '../../primitives/Radio';
import { SelectProps } from '../../primitives/Select';
import { AsyncSelectProps } from '../../components/AsyncSelect';
type InputComponent = InputProps & {
    component: 'input';
};
type SelectComponent = SelectProps<unknown> & {
    component: 'select';
};
type AsyncSelectComponent = AsyncSelectProps & {
    component: 'async-select';
};
type CheckboxComponent = CheckboxProps & {
    component: 'checkbox';
};
type CheckboxGroupComponent = CheckBoxGroupProps & {
    component: 'checkbox-group';
};
type RadioComponent = RadioProps & {
    component: 'radio';
};
type RadioGroupComponent = RadioGroupProps & {
    component: 'radio-group';
};
type DatePickerComponent = DatePickerProps & {
    component: 'date-picker';
};
type RangePickerComponent = RangePickerProps & {
    component: 'range-picker';
};
type ToggleComponent = ToggleProps & {
    component: 'toggle';
};
export type ComponentPickerProps = InputComponent | SelectComponent | AsyncSelectComponent | CheckboxComponent | CheckboxGroupComponent | DatePickerComponent | ToggleComponent | RangePickerComponent | RadioComponent | RadioGroupComponent;
export {};
