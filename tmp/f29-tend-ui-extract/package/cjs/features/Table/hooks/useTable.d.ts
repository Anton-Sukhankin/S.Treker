import { TableForm } from '../../../features/Table/types';
import { GenericObject } from '../../../types/GenericObject';
export declare const useTable: <TFilter extends GenericObject = GenericObject>() => {
    form: import("../../../components/Form").FormInstance<TableForm<TFilter>>;
};
