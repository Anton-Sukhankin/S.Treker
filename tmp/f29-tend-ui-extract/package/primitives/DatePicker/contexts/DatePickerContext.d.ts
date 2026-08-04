import React from 'react';
import { Dayjs } from 'dayjs';
import { DatePickerProps } from '../types';
type DatePickerContextType = DatePickerProps & {
    _open?: boolean;
    _value?: Dayjs | null;
    setValue?: React.Dispatch<React.SetStateAction<Dayjs | null>>;
};
export declare const DatePickerContext: React.Context<DatePickerContextType | undefined>;
export declare const useDatePickerContext: () => DatePickerContextType | undefined;
export {};
