export declare const Avatar: import("react").ForwardRefExoticComponent<Omit<import("react").ImgHTMLAttributes<HTMLImageElement>, "src"> & {
    pointer?: boolean;
    bordered?: boolean;
    src?: string | string[];
    size?: import("./types").AvatarSize;
    status?: import("./types").AvatarStatus | Pick<import("..").BadgeProps, "preset" | "offset" | "placement">;
    fit?: "contain" | "cover";
    UNSTABLE_styling?: import("./types").AvatarStylingSchema;
} & import("react").RefAttributes<HTMLSpanElement>> & {
    Root: import("react").ForwardRefExoticComponent<Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, "ref"> & {
        pointer?: boolean;
        size?: import("./types").AvatarSize;
        bordered?: boolean;
        UNSTABLE_styling?: import("./types").AvatarStylingSchema;
    } & import("react").RefAttributes<HTMLSpanElement>>;
    Image: import("react").ForwardRefExoticComponent<Omit<import("react").DetailedHTMLProps<import("react").ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>, "ref"> & {
        fit?: "contain" | "cover";
    } & import("react").RefAttributes<HTMLImageElement>>;
    Fallback: import("react").ForwardRefExoticComponent<Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, "ref"> & import("react").RefAttributes<HTMLSpanElement>>;
    List: import("react").ForwardRefExoticComponent<Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, "ref"> & {
        max?: number;
    } & import("react").RefAttributes<HTMLSpanElement>>;
};
