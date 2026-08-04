import { GenericObject } from '../../../types';
import { FormInstance } from '../../../components/Form';
export declare const useFiltersForm: <T extends GenericObject = GenericObject>(form?: FormInstance<T>, scope?: string) => {
    set: (name: string, payload: unknown) => void;
    clear: (name: string) => readonly [Partial<T>, T];
    reset: () => T;
    get: <R = unknown>(name: string) => R;
    getState: () => T;
    form: FormInstance<T>;
    fill: (payload: T) => void;
    getScopeState: () => any;
};
