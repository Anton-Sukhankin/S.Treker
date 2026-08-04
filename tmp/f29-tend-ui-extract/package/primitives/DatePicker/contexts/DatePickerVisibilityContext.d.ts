import React from 'react';
type DatePickerVisibilityContextType = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
export declare const DatePickerVisibilityContext: React.Context<DatePickerVisibilityContextType | undefined>;
export declare const useDatePickerVisibilityContext: () => DatePickerVisibilityContextType | undefined;
export {};
