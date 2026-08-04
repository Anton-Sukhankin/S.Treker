import React from 'react';
declare const RangePicker: React.ForwardRefExoticComponent<Omit<import("antd-core/es/date-picker").RangePickerProps, "size" | "allowClear" | "suffixIcon" | "prevIcon" | "nextIcon" | "superPrevIcon" | "superNextIcon"> & import("@10d/tend-ui-styling").MarginProperties & {
    fullWidth?: boolean;
    allowClear?: boolean;
    clearIconTooltip?: import("@10d/tend-ui-primitives").TooltipProps;
    size?: import("../../types").Size;
    width?: string;
} & React.RefAttributes<React.Component<import("antd-core/es/date-picker/generatePicker").RangePickerProps<import("dayjs").Dayjs> & {
    dropdownClassName?: string | undefined;
    popupClassName?: string | undefined;
    rootClassName?: string | undefined;
}, unknown, any>>>;
export { RangePicker };
