import { AsyncRadioProps } from '../../../../components/AsyncRadio';
import { FilterConfig } from '../..';
export type AsyncRadioFilterProps = AsyncRadioProps & {
    INTERNAL_scope?: string;
    config: FilterConfig;
};
