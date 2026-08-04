import React from 'react';
import { BadgeProps } from '../../primitives/Badge';
declare const Actions: React.ForwardRefExoticComponent<Omit<React.HTMLAttributes<HTMLDivElement>, "children"> & {
    visible?: boolean;
    counter?: number | (Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, "ref"> & Pick<BadgeProps, "max" | "preset"> & {
        inner?: number;
    });
    counterText?: string;
    okText?: React.ReactNode;
    okButtonProps?: Omit<import("../../primitives/Button").ButtonProps<"button">, "ref">;
    onOk?: () => void;
    cancelText?: React.ReactNode;
    cancelButtonProps?: Omit<import("../../primitives/Button").ButtonProps<"button">, "ref">;
    onCancel?: () => void;
    extra?: React.ReactNode | React.ReactNode[];
    offset?: number;
} & React.RefAttributes<HTMLDivElement>>;
export { Actions };
