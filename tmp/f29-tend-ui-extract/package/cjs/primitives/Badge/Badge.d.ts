import React from 'react';
/**
 * @deprecated Устарело. Используйте `primitives/Counter`, `ui/Dot` и `primitives/Tag` соответственно
 */
declare const Badge: React.ForwardRefExoticComponent<Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, "ref"> & {
    showZero?: boolean;
    variant?: import("./types").BadgeVariant;
    before?: React.ReactNode;
    after?: React.ReactNode;
    inner?: React.ReactNode;
    max?: number;
    preset?: import("./types").BadgePreset;
    offset?: number[];
    padding?: string;
    placement?: "leftTop" | "rightTop" | "rightBottom" | "leftBottom";
    rootClassName?: string;
} & React.RefAttributes<HTMLSpanElement>>;
export { Badge };
