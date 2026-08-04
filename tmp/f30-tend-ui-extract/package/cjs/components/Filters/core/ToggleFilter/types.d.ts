import { ToggleProps } from '../../../../primitives/Toggle';
import { FilterConfig } from '../..';
export type ToggleFilterProps = ToggleProps & {
    INTERNAL_scope?: string;
    config: FilterConfig;
};
