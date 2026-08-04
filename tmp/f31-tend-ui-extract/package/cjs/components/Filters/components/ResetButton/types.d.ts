import { ButtonProps } from '../../../../primitives/Button';
import { FilterConfig } from '../../../../components/Filters/core/types';
export type ResetButtonProps = Pick<ButtonProps, 'onClick'> & {
    filter: FilterConfig;
};
