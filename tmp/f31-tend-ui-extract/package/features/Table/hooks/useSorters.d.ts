import { ColumnConfig } from '../../../features/Table/types/Columns';
import { SorterConfig } from '../../../features/Table/types/SorterConfig';
/**
 * @deprecated Не использовать
 */
export declare const useSorters: <T extends ColumnConfig = import("../../../components").ColumnConfig>(columns: T[]) => SorterConfig[];
