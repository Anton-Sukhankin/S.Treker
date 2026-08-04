import React from 'react';
import { Dayjs } from 'dayjs';
export declare const createPicker: () => React.ForwardRefExoticComponent<Omit<import("antd-core").DatePickerProps, "size" | "allowClear" | "prevIcon" | "nextIcon" | "superPrevIcon" | "superNextIcon"> & {
    fullWidth?: boolean;
    showToday?: boolean;
    allowClear?: boolean;
    clearIconTooltip?: import("@10d/tend-ui-primitives").TooltipProps;
    size?: import("../../types").Size;
    width?: string;
} & import("@10d/tend-ui-styling").MarginProperties & React.RefAttributes<React.Component<import("antd-core/es/date-picker/generatePicker").PickerProps<Dayjs> & {
    status?: "" | "error" | "warning" | undefined;
    hashId?: string | undefined;
    popupClassName?: string | undefined;
    rootClassName?: string | undefined;
}, unknown, any>>> & {
    displayName: string;
    Trigger: {
        ({ component: Component, onClick, ...props }: React.PropsWithChildren<import("./components").TriggerProps>): React.JSX.Element;
        displayName: string;
    };
};
export declare const DatePicker: React.ForwardRefExoticComponent<Omit<import("antd-core").DatePickerProps, "size" | "allowClear" | "prevIcon" | "nextIcon" | "superPrevIcon" | "superNextIcon"> & {
    fullWidth?: boolean;
    showToday?: boolean;
    allowClear?: boolean;
    clearIconTooltip?: import("@10d/tend-ui-primitives").TooltipProps;
    size?: import("../../types").Size;
    width?: string;
} & import("@10d/tend-ui-styling").MarginProperties & React.RefAttributes<React.Component<import("antd-core/es/date-picker/generatePicker").PickerProps<Dayjs> & {
    status?: "" | "error" | "warning" | undefined;
    hashId?: string | undefined;
    popupClassName?: string | undefined;
    rootClassName?: string | undefined;
}, unknown, any>>> & {
    displayName: string;
    Trigger: {
        ({ component: Component, onClick, ...props }: React.PropsWithChildren<import("./components").TriggerProps>): React.JSX.Element;
        displayName: string;
    };
};
