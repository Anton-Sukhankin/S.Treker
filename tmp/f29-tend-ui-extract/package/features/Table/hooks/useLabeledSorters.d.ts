import { ColumnConfig } from '../../../features/Table/types/Columns';
import { SorterConfig } from '../../../features/Table/types/SorterConfig';
export declare const useLabeledSorters: <S extends SorterConfig = SorterConfig, T extends ColumnConfig = import("../../../components").ColumnConfig>(sorters: S[], columns: T[]) => S[];
