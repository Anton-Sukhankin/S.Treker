import { GenericObject } from '../../../types/GenericObject';
import { FilterConfig } from '..';
export declare const useDisabled: <P extends {
    config: FilterConfig;
    disabled?: boolean | [boolean, boolean];
}, V = GenericObject>(props: P, values: V) => boolean | undefined;
