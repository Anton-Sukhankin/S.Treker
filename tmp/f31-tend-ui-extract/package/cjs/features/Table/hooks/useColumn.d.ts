import { ColumnConfig } from '../../../features/Table/types/Columns';
/**
 * Groups `column` by `id` and returns single `column` by the given unique `id`
 * @returns tuple `[Column]`
 * @param columns - колонки
 */
export declare const useColumn: <T extends ColumnConfig = import("../../../components").ColumnConfig>(columns: T[], id: string) => T[];
