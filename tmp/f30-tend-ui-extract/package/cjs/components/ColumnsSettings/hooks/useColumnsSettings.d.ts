import { CoreColumnsSettingsProps } from '../../../components/ColumnsSettings/types';
import { ColumnConfig } from '../../../components/ColumnsSettings/core/interfaces';
import { useColumns } from '../../../components/ColumnsSettings/hooks';
export declare const useColumnsSettings: <T extends ColumnConfig = ColumnConfig>(model: ReturnType<typeof useColumns<T>>[1]) => CoreColumnsSettingsProps<T>;
