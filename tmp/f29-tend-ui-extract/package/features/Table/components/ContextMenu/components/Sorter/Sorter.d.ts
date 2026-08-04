import React from 'react';
declare const Sorter: {
    (): React.JSX.Element;
    displayName: string;
    Root: {
        <T extends import("../../../..").ColumnConfig = import("../../../../../../components").ColumnConfig>({ column, children, }: import("./components/Root/types").RootProps<T>): React.JSX.Element | null;
        displayName: string;
    };
    ToggleSorter: {
        ({ value, onChange, children }: import("./components/ToggleSorter/types").ItemProps): React.JSX.Element;
        displayName: string;
        Layout: React.FC<{}>;
        Ascending: ({ ...rest }: Omit<Omit<Omit<React.DetailedHTMLProps<React.LiHTMLAttributes<HTMLLIElement>, HTMLLIElement>, "ref">, "value" | "onClick"> & {
            disabled?: boolean;
            value?: string | undefined;
            before?: React.ReactNode;
            after?: React.ReactNode;
            onClick?: ((e: React.MouseEvent<HTMLLIElement>, value?: string | undefined) => void) | undefined;
        } & {
            ref?: React.ForwardedRef<import("../../../../../../ui/List/Item/types").ItemRef>;
        }, "ref">) => React.JSX.Element;
        Descending: ({ ...rest }: Omit<Omit<Omit<React.DetailedHTMLProps<React.LiHTMLAttributes<HTMLLIElement>, HTMLLIElement>, "ref">, "value" | "onClick"> & {
            disabled?: boolean;
            value?: string | undefined;
            before?: React.ReactNode;
            after?: React.ReactNode;
            onClick?: ((e: React.MouseEvent<HTMLLIElement>, value?: string | undefined) => void) | undefined;
        } & {
            ref?: React.ForwardedRef<import("../../../../../../ui/List/Item/types").ItemRef>;
        }, "ref">) => React.JSX.Element;
    };
};
export { Sorter };
