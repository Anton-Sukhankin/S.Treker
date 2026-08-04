import { SorterConfig } from '../../../features/Table/types/SorterConfig';
/**
 * @returns tuple `[SorterConfig]`
 * @description Groups `SorterConfig` by `id` and returns single `SorterConfig` by the given unique `id`
 */
export declare const useSorter: (sorters: SorterConfig[], id: string) => SorterConfig[];
