import React from 'react';
import { TooltipProps } from '@10d/tend-ui-primitives';
declare const Alert: React.ForwardRefExoticComponent<Omit<React.HTMLAttributes<HTMLDivElement>, "children"> & {
    border?: boolean;
    closable?: boolean;
    showIcon?: boolean;
    type?: import("./types").AlertType;
    message?: React.ReactNode;
    description?: React.ReactNode;
    onClose?: React.MouseEventHandler<HTMLButtonElement>;
    icon?: React.ReactNode;
    closeIcon?: boolean | React.ReactNode;
    action?: React.ReactNode;
    footer?: React.ReactNode | React.ReactNode[];
    closeIconTooltip?: Omit<TooltipProps, "children">;
} & import("@10d/tend-ui-styling").MarginProperties & React.RefAttributes<HTMLDivElement>>;
export { Alert };
