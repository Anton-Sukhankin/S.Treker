import { SelectProps } from '../../../../primitives/Select';
import { FilterConfig } from '../..';
export type SelectFilterProps = SelectProps & {
    INTERNAL_scope?: string;
    config: FilterConfig;
};
