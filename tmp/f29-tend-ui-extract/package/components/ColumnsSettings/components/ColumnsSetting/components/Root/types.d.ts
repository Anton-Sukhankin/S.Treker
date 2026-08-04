import React from 'react';
import { ColumnConfig } from '../../../../../../components/ColumnsSettings/types';
export type RootProps<T extends ColumnConfig = ColumnConfig> = {
    children?: React.ReactNode;
    className?: string;
    column: T;
};
