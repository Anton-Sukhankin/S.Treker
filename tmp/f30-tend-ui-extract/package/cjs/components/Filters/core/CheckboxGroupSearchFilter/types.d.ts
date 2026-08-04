import { CheckboxGroupSearchProps } from '../../../../components/CheckboxGroupSearch';
import { FilterConfig } from '../..';
export type CheckboxGroupSearchFilterProps = CheckboxGroupSearchProps & {
    INTERNAL_scope?: string;
    config: FilterConfig;
};
