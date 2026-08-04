import React from 'react';
import { ColumnsSettingsProps } from './types';
import { ColumnConfig } from './core/interfaces/ColumnConfig';
/**
 * @deprecated Компонент устарел и больше не поддерживается.
 * Используйте компонент из пакета `@10d/tend-ui-columns-settings`.
 */
export declare const ColumnsSettings: React.NamedExoticComponent<import("./types").CoreColumnsSettingsProps<ColumnConfig> & {
    title?: React.ReactNode;
    open?: import("@10d/tend-ui-primitives").DrawerProps["open"];
    onClose?: import("@10d/tend-ui-primitives").DrawerProps["onClose"];
}> & {
    readonly type: <T extends ColumnConfig = ColumnConfig>({ title, columns, onColumnVisibilityChange, onColumnDragEnd, onColumnsReset, onColumnPinningChange, showPresets, defaultPresets, onPresetApply, onPresetEdit, onPresetRemove, onPresetSave, ...props }: ColumnsSettingsProps<T>) => React.JSX.Element;
} & {
    displayName: string;
    Root: {
        <T extends ColumnConfig = ColumnConfig>({ columns, children, onColumnDragEnd, defaultPresets, onPresetApply, onPresetEdit, onPresetRemove, onPresetSave, }: import("./components/Root").RootProps<T>): React.JSX.Element;
        displayName: string;
    };
    List: <T extends ColumnConfig = ColumnConfig>({ columns, children, gap, }: import("./components/List").ListProps<T>) => React.JSX.Element;
    ColumnsSetting: (<T extends ColumnConfig = ColumnConfig>({ column, onColumnVisibilityChange, onColumnPinningChange, }: import("./components/ColumnsSetting/types").ColumnsSettingProps<T>) => React.JSX.Element) & {
        Root: <T extends ColumnConfig = ColumnConfig>({ column, className, children, }: import("./components/ColumnsSetting/components").RootProps<T>) => React.JSX.Element;
        DragHandle: React.FC<import("./components/ColumnsSetting/components").DragHandleProps>;
        Pin: ({ disabled, pinned, onClick, onChange }: import("./components/ColumnsSetting/components").PinProps) => React.JSX.Element;
    };
    ResetButton: {
        ({ children, ...props }: import("./components/ResetButton/types").ResetButtonProps): React.JSX.Element;
        displayName: string;
    };
};
