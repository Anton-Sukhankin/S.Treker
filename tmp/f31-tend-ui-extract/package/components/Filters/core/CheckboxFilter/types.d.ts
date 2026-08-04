import { CheckboxProps } from '../../../../primitives/Checkbox';
import { FilterConfig } from '../..';
export type CheckboxFilterProps = CheckboxProps & {
    INTERNAL_scope?: string;
    config: FilterConfig;
};
