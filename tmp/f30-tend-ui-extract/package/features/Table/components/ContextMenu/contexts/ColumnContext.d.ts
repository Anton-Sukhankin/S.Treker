import React from 'react';
import { ColumnConfig } from '../../../../../features/Table/types';
declare const ColumnsContext: ({ value, children, }: React.PropsWithChildren<{
    value: ColumnConfig;
}>) => React.JSX.Element;
declare const useColumnContext: <T extends ColumnConfig = import("../../../../../components").ColumnConfig>() => T;
export { ColumnsContext, useColumnContext };
