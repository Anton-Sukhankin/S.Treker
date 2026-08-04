import { ColumnConfig, ColumnsSettingsPresetValue } from '../core/interfaces';
export declare const mapColumnsForPreset: <T extends ColumnConfig = ColumnConfig>(columns: T[]) => ColumnsSettingsPresetValue[];
