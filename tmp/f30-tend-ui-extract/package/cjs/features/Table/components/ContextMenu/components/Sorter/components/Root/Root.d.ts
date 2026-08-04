import React from 'react';
import { ColumnConfig } from '../../../../../../../../features/Table/types/Columns';
import { RootProps } from './types';
declare const Root: {
    <T extends ColumnConfig = import("../../../../../../../../components").ColumnConfig>({ column, children, }: RootProps<T>): React.JSX.Element | null;
    displayName: string;
};
export { Root };
