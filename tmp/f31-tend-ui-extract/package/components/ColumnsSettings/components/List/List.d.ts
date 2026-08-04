import React from 'react';
import { ColumnConfig } from '../../../../components/ColumnsSettings/core/interfaces';
import { ListProps } from './types';
declare const List: <T extends ColumnConfig = ColumnConfig>({ columns, children, gap, }: ListProps<T>) => React.JSX.Element;
export { List };
