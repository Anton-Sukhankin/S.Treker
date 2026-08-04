import React from 'react';
import { ColumnConfig } from '../../../../components/ColumnsSettings/core';
import { SavePresetButtonProps } from './types';
declare const SavePresetButton: {
    <T extends ColumnConfig = ColumnConfig>({ columns, }: SavePresetButtonProps<T>): React.JSX.Element;
    displayName: string;
};
export { SavePresetButton };
