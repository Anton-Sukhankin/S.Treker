import React from 'react';
import AntDatePicker, { RangePickerProps as AntRangePickerProps } from 'antd-core/es/date-picker';
import { MarginProperties } from '@10d/tend-ui-styling';
import { TooltipProps } from '../../primitives/Tooltip';
import { Size } from '../../types/Size';
export type RangePickerRef = React.ElementRef<typeof AntDatePicker.RangePicker>;
export type RangePickerProps = Omit<AntRangePickerProps, 'size' | 'allowClear' | 'nextIcon' | 'superNextIcon' | 'prevIcon' | 'superPrevIcon' | 'suffixIcon'> & MarginProperties & {
    fullWidth?: boolean;
    allowClear?: boolean;
    clearIconTooltip?: TooltipProps;
    size?: Size;
    width?: string;
};
