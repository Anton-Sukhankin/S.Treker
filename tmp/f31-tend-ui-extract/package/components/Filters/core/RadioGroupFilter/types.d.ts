import { RadioGroupProps } from '../../../../primitives/Radio';
import { FilterConfig } from '../..';
export type RadioGroupFilterProps = RadioGroupProps & {
    INTERNAL_scope?: string;
    config: FilterConfig;
};
