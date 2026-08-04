import { FiltersProps as DefaultFiltersProps } from '../../../../components/Filters/types';
import { GenericObject } from '../../../../types/GenericObject';
export type FiltersProps<T extends GenericObject = GenericObject> = Omit<DefaultFiltersProps<T>, 'filters' | 'resetAllButtonProps' | 'form' | 'name' | 'onFiltersReset' | 'onFilterReset'>;
