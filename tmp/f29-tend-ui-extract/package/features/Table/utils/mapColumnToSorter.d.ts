import { ColumnConfig } from '../../../features/Table/types/Columns';
/**
 * @deprecated Устарело
 */
export declare const mapColumnToSorter: <T extends ColumnConfig = import("../../../components").ColumnConfig>(column: T) => {
    key: string;
    id: string;
    name: string;
    label: import("react").ReactNode;
};
