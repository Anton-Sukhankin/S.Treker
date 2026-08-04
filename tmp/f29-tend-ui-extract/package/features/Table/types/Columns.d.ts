import { ColumnGroupType as PrimitiveColumnGroupType, ColumnType as PrimitiveColumnType, RowSelection as PrimitiveRowSelection } from '../../../primitives/Table/types';
import { ColumnConfig as DefaultColumnConfig } from '../../../components/ColumnsSettings/types';
export type ColumnConfig = DefaultColumnConfig;
export type ColumnType<T> = PrimitiveColumnType<T> & ColumnConfig;
export type ColumnGroupType<T> = PrimitiveColumnGroupType<T>;
export type ColumnsType<T> = (ColumnType<T> | PrimitiveColumnGroupType<T>)[];
export type RowSelection<T> = PrimitiveRowSelection<T>;
