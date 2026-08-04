import { FormInstance } from '../../../components/Form';
import { GenericObject } from '../../../types';
interface FiltersFormProviderValue {
    form: FormInstance<GenericObject>;
    getScopedState: () => GenericObject;
    onClear?: (name: string) => void;
    onReset?: () => void;
}
export declare const FiltersFormProvider: {
    (props: FiltersFormProviderValue & {
        children: import("react").ReactNode;
    }): import("react").JSX.Element;
    displayName: string;
}, useFiltersFormProvider: (consumer: string) => FiltersFormProviderValue;
export {};
