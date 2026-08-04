import React from 'react';
import { ColumnConfig } from '../../../../../../../../features/Table/types/Columns';
export type RootProps<T extends ColumnConfig = ColumnConfig> = {
    column: T;
    children?: React.ReactNode;
};
