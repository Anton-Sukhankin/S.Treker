import React from 'react';
import { ColumnConfig } from '../../../../../../components/ColumnsSettings/core/interfaces';
import { RootProps } from './types';
declare const Root: <T extends ColumnConfig = ColumnConfig>({ column, className, children, }: RootProps<T>) => React.JSX.Element;
export { Root };
