import { InputProps } from '../../../../primitives';
import { FilterConfig } from '../..';
export type InputFilterProps = InputProps & {
    INTERNAL_scope?: string;
    config: FilterConfig;
};
