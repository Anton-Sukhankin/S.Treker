import { RadioGroupSearchProps } from '../../../../components/RadioGroupSearch';
import { FilterConfig } from '../..';
export type RadioGroupSearchFilterProps = RadioGroupSearchProps & {
    INTERNAL_scope?: string;
    config: FilterConfig;
};
