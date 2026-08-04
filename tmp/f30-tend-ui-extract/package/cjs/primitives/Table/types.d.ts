import React from 'react';
import type { TableProps as AntTableProps, TableRef as AntTableRef } from 'antd-core/es/table';
import { EmptyProps } from '@10d/tend-ui-primitives';
import { GenericObject } from '@10d/tend-ui-types';
import { Size } from '../../types/Size';
import { ColumnGroupType, ColumnProps, ColumnType, ColumnsType, RowClassName, RowSelection } from './core/interfaces';
export type TableRef = AntTableRef;
export type TableProps<T extends GenericObject = GenericObject> = Omit<AntTableProps<T>, 'size' | 'pagination' | 'rowClassName' | 'loading'> & {
    loading?: boolean;
    size?: Size;
    rowClassName?: RowClassName<T>;
    empty?: Pick<EmptyProps, 'title' | 'description' | 'buttons'>;
};
export type TableComponent = (<T extends GenericObject = GenericObject>(props: TableProps<T> & {
    ref?: React.ForwardedRef<TableRef>;
}) => React.JSX.Element) & Pick<React.FC, 'displayName'>;
export type { RowClassName, RowSelection, ColumnType, ColumnGroupType, ColumnsType, ColumnProps, };
