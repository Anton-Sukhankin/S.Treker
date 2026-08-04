import { AsyncSelectProps } from '../../../../components/AsyncSelect';
import { FilterConfig } from '../../../../features/Table/types';
export type AsyncSelectFilterProps = AsyncSelectProps & {
    INTERNAL_scope?: string;
    config: FilterConfig;
};
