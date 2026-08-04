import { FormItemProps as AntItemProps } from 'antd-core/es/form';
import { TooltipProps } from '../../../../primitives/Tooltip';
export type ItemProps<T = any> = Omit<AntItemProps<T>, 'tooltip'> & {
    tooltip?: TooltipProps;
    width?: number | string;
};
