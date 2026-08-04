import { ColumnConfig } from '../types';
export declare const mapColumnsForLocalStorage: <T extends ColumnConfig = ColumnConfig>(columns: T[]) => Pick<T, "fixed" | "visible" | "id" | "draggable" | "disabled" | "pinnable">[];
