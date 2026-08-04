import React from 'react';
import { ColumnConfig } from '../../../../features/Table/types/Columns';
import { ContextMenuProps } from './types';
export declare const ContextMenu: (<T extends ColumnConfig = import("../../../../components").ColumnConfig>({ id, children, content, }: ContextMenuProps) => React.JSX.Element) & {
    displayName: string;
    Sorter: {
        (): React.JSX.Element;
        displayName: string;
        Root: {
            <T extends ColumnConfig = import("../../../../components").ColumnConfig>({ column, children, }: import("./components/Sorter/components/Root/types").RootProps<T>): React.JSX.Element | null;
            displayName: string;
        };
        ToggleSorter: {
            ({ value, onChange, children }: import("./components/Sorter/components/ToggleSorter/types").ItemProps): React.JSX.Element;
            displayName: string;
            Layout: React.FC<{}>;
            Ascending: ({ ...rest }: Omit<Omit<Omit<React.DetailedHTMLProps<React.LiHTMLAttributes<HTMLLIElement>, HTMLLIElement>, "ref">, "value" | "onClick"> & {
                disabled?: boolean;
                value?: string | undefined;
                before?: React.ReactNode;
                after?: React.ReactNode;
                onClick?: ((e: React.MouseEvent<HTMLLIElement>, value?: string | undefined) => void) | undefined;
            } & {
                ref?: React.ForwardedRef<import("../../../../ui/List/Item/types").ItemRef>;
            }, "ref">) => React.JSX.Element;
            Descending: ({ ...rest }: Omit<Omit<Omit<React.DetailedHTMLProps<React.LiHTMLAttributes<HTMLLIElement>, HTMLLIElement>, "ref">, "value" | "onClick"> & {
                disabled?: boolean;
                value?: string | undefined;
                before?: React.ReactNode;
                after?: React.ReactNode;
                onClick?: ((e: React.MouseEvent<HTMLLIElement>, value?: string | undefined) => void) | undefined;
            } & {
                ref?: React.ForwardedRef<import("../../../../ui/List/Item/types").ItemRef>;
            }, "ref">) => React.JSX.Element;
        };
    };
    Filter: {
        (): React.JSX.Element | null;
        displayName: string;
        Header: () => React.JSX.Element;
    };
    ColumnActions: {
        <T extends ColumnConfig = import("../../../../components").ColumnConfig>(): React.JSX.Element;
        displayName: string;
        Layout: React.FC<{}>;
        PinningButton: {
            ({ pinned, onChange, onClick, disabled }: import("./components/Actions/components/PinningButton").PinningButtonProps): React.JSX.Element;
            displayName: string;
        };
        HidingButton: {
            ({ onClick, disabled }: import("./components/Actions/components/HidingButton").HidingButtonProps): React.JSX.Element;
            displayName: string;
        };
    };
    Divider: () => React.JSX.Element;
};
