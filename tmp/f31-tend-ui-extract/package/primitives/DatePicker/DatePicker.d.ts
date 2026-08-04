declare const DatePicker: import("react").ForwardRefExoticComponent<Omit<import("antd-core").DatePickerProps, "size" | "allowClear" | "prevIcon" | "nextIcon" | "superPrevIcon" | "superNextIcon"> & {
    fullWidth?: boolean;
    showToday?: boolean;
    allowClear?: boolean;
    clearIconTooltip?: import("@10d/tend-ui-primitives").TooltipProps;
    size?: import("../../types").Size;
    width?: string;
} & import("@10d/tend-ui-styling").MarginProperties & import("react").RefAttributes<import("react").Component<import("antd-core/es/date-picker/generatePicker").PickerProps<import("dayjs").Dayjs> & {
    status?: "" | "error" | "warning" | undefined;
    hashId?: string | undefined;
    popupClassName?: string | undefined;
    rootClassName?: string | undefined;
}, unknown, any>>> & {
    displayName: string;
    Trigger: {
        ({ component: Component, onClick, ...props }: import("react").PropsWithChildren<import("./components").TriggerProps>): import("react").JSX.Element;
        displayName: string;
    };
};
export { DatePicker };
