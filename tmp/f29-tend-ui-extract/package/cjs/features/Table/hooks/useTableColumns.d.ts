import { ColumnConfig } from '../../../features/Table/types/Columns';
export declare const useTableColumns: <TColumn extends ColumnConfig = import("../../../components").ColumnConfig>() => {
    columns: TColumn[];
    pin: (position: import("../../../components/ColumnsSettings/types").ColumnPosition, column: TColumn) => void;
    display: (visible: boolean, column: TColumn) => void;
};
