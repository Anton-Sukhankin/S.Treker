import React from 'react';
import { ColumnConfig } from '../../../../components/ColumnsSettings/core/interfaces';
import { ColumnsSettingProps } from './types';
declare const ColumnsSetting: (<T extends ColumnConfig = ColumnConfig>({ column, onColumnVisibilityChange, onColumnPinningChange, }: ColumnsSettingProps<T>) => React.JSX.Element) & {
    Root: <T extends ColumnConfig = ColumnConfig>({ column, className, children, }: import("./components").RootProps<T>) => React.JSX.Element;
    DragHandle: React.FC<import("./components").DragHandleProps>;
    Pin: ({ disabled, pinned, onClick, onChange }: import("./components").PinProps) => React.JSX.Element;
};
export { ColumnsSetting };
