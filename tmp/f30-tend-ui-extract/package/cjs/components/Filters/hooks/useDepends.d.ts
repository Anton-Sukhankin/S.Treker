import { GenericObject } from '../../../types/GenericObject';
import { FilterConfig } from '..';
export declare const useDepends: <P extends {
    config: FilterConfig;
}, V = GenericObject>(props: P, values: V) => string;
