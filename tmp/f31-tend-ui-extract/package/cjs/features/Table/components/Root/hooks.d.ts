import { GenericObject } from '../../../../types/GenericObject';
import { SortingOrder } from '../../../../features/Table/types/SortingOrder';
import { FilterConfig } from '../../../../features/Table/types';
type OnSearchValueChange = (changed: {
    search: string;
}, value: string) => void;
/**
 * @internal Не для публичного использования
 */
export declare const useFormChangeCallback: <F extends GenericObject = GenericObject>(parameters: {
    filters?: FilterConfig[];
    onFilterValuesChange?: (changed: Partial<F>, values: F) => void;
    onSorterValuesChange?: (changed: Partial<Record<keyof F, SortingOrder>>, values: Record<keyof F, SortingOrder>) => void;
    onSearchValueChange?: OnSearchValueChange;
}) => (name: string, info: import("rc-field-form/lib/FormContext").FormChangeInfo) => void;
export {};
