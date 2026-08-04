import React from 'react';
import { ColumnConfig } from '../../../../components/ColumnsSettings/core/interfaces';
import { RootProps } from './types';
declare const Root: {
    <T extends ColumnConfig = ColumnConfig>({ columns, children, onColumnDragEnd, defaultPresets, onPresetApply, onPresetEdit, onPresetRemove, onPresetSave, }: RootProps<T>): React.JSX.Element;
    displayName: string;
};
export { Root };
