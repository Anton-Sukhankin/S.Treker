import { FilterConfig } from '../../../components/Filters';
/**
 * @returns tuple `[Filter]` or `[]`
 * @description Groups `filters` by `id` and returns single `filter` by the given unique `id`
 */
export declare const useFilter: (filters: FilterConfig[], id: string) => FilterConfig[];
