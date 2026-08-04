import { ColumnsSettingsPreset } from '../core/interfaces/ColumnsSettingsPreset';
type Context = {
    presets: ColumnsSettingsPreset[];
    onPresetSave?: (preset: ColumnsSettingsPreset) => void;
    onPresetEdit?: (preset: ColumnsSettingsPreset) => void;
    onPresetRemove?: (preset: ColumnsSettingsPreset) => void;
    onPresetApply?: (preset: ColumnsSettingsPreset) => void;
};
export declare const ColumnsSettingsPresetsProvider: {
    (props: Context & {
        children: import("react").ReactNode;
    }): import("react").JSX.Element;
    displayName: string;
}, useColumnsSettingsPresetsProvider: (consumer: string) => Context;
export {};
