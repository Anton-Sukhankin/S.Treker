import { ColumnConfig, ColumnPosition } from '../../../components/ColumnsSettings/types';
type ColumnsContextType<TColumn extends ColumnConfig = ColumnConfig> = {
    columns: TColumn[];
    pin: (position: ColumnPosition, column: TColumn) => void;
    display: (visible: boolean, column: TColumn) => void;
};
declare const ColumnsContext: import("react").Provider<ColumnsContextType<any> | undefined>;
declare const useColumnsContext: <TColumn extends ColumnConfig = ColumnConfig>() => ColumnsContextType<TColumn>;
export { ColumnsContext, useColumnsContext };
export type { ColumnsContextType };
