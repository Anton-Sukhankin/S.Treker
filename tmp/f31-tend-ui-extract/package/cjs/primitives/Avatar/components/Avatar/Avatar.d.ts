import React from 'react';
import { BadgeProps } from '../../../../primitives/Badge';
declare const Avatar: React.ForwardRefExoticComponent<Omit<React.ImgHTMLAttributes<HTMLImageElement>, "src"> & {
    pointer?: boolean;
    bordered?: boolean;
    src?: string | string[];
    size?: import("../../types").AvatarSize;
    status?: import("../../types").AvatarStatus | Pick<BadgeProps, "preset" | "offset" | "placement">;
    fit?: "contain" | "cover";
    UNSTABLE_styling?: import("../../types").AvatarStylingSchema;
} & React.RefAttributes<HTMLSpanElement>>;
export { Avatar };
