import { FilterPreset } from '../core/types';
type Context = {
    presets: FilterPreset[];
    onSave: (preset: FilterPreset) => void;
    onEdit: (preset: FilterPreset) => void;
    onRemove: (preset: FilterPreset) => void;
    onApply: (preset: FilterPreset) => void;
};
export declare const FiltersPresetsProvider: {
    (props: Context & {
        children: import("react").ReactNode;
    }): import("react").JSX.Element;
    displayName: string;
}, useFiltersPresetsProvider: (consumer: string) => Context;
export {};
