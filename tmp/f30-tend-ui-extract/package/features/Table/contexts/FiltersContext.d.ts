import { FilterConfig } from '../../../components/Filters';
type FiltersContextType = {
    filters: FilterConfig[];
    clear: (name: string) => void;
    reset: () => void;
};
declare const FiltersContext: import("react").Provider<FiltersContextType | undefined>;
declare const useFiltersContext: () => FiltersContextType;
export { FiltersContext, useFiltersContext };
export type { FiltersContextType };
