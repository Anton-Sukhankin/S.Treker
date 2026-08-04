import { SortingOrder } from '../../../features/Table/types/SortingOrder';
import { GenericObject } from '../../../types/GenericObject';
export type TableForm<TFilter extends GenericObject = GenericObject> = {
    filters: TFilter;
    sorters: Record<keyof TFilter, SortingOrder>;
    search: string;
};
