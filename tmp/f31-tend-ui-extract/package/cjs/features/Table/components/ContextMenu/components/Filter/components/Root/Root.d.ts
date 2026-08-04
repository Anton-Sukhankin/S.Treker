import React from 'react';
import { ColumnConfig } from '../../../../../../../../features/Table/types/Columns';
export declare const Root: <T extends ColumnConfig = import("../../../../../../../../components").ColumnConfig>({ children, column, }: {
    column: T;
    children?: React.ReactNode;
}) => React.JSX.Element | null;
