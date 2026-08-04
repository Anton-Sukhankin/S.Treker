import React from 'react';
declare const Collapse: React.ForwardRefExoticComponent<Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref"> & {
    children?: React.ReactNode;
    label?: React.ReactNode;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    arrowPosition?: "end" | "start";
} & React.RefAttributes<HTMLDivElement>> & {
    displayName: string;
    Group: React.FC<import("./types").CollapseGroupProps>;
    Root: React.ForwardRefExoticComponent<import("./components/Root/types").RootProps & React.RefAttributes<HTMLDivElement>>;
    Header: React.FC<{}>;
    Arrow: {
        (): React.JSX.Element;
        displayName: string;
    };
    Content: React.FC<{}>;
};
export { Collapse };
