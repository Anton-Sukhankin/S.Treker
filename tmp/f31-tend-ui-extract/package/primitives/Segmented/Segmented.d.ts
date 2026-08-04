import React from 'react';
declare const Segmented: React.ForwardRefExoticComponent<Omit<import("antd-core").SegmentedProps, "ref" | "options" | "size"> & {
    options: ((import("rc-segmented").SegmentedValue | import("antd-core/es/segmented").SegmentedLabeledOption) & {
        badge?: Omit<import("../../primitives/Badge").BadgeProps, "padding">;
    })[];
} & React.RefAttributes<HTMLDivElement>>;
export { Segmented };
