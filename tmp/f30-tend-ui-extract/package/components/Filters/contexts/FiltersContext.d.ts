import { CoreFiltersProps } from '../types';
type FiltersContextType = Pick<CoreFiltersProps, 'name' | 'debounce' | 'onFilterValuesChange' | 'onFiltersReset' | 'onFilterReset' | 'value'> & {
    form: NonNullable<CoreFiltersProps['form']>;
};
export declare const FiltersContext: import("react").Provider<FiltersContextType | undefined>, useFiltersContext: (consumer?: string) => NonNullable<FiltersContextType>;
export {};
