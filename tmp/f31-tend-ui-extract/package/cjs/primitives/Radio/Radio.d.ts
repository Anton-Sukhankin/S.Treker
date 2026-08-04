import React from 'react';
declare const Radio: React.ForwardRefExoticComponent<Omit<import("antd-core").RadioProps & React.RefAttributes<import("rc-checkbox").CheckboxRef>, "ref"> & React.RefAttributes<import("rc-checkbox").CheckboxRef>> & {
    displayName: string;
    Group: React.ForwardRefExoticComponent<Omit<import("antd-core").RadioGroupProps & React.RefAttributes<HTMLDivElement>, "ref"> & {
        fullWidth?: boolean;
        layout?: "horizontal" | "vertical";
    } & React.RefAttributes<HTMLDivElement>>;
    Button: React.ForwardRefExoticComponent<import("antd-core/es/radio/radioButton").RadioButtonProps & React.RefAttributes<import("rc-checkbox").CheckboxRef>>;
};
export { Radio };
