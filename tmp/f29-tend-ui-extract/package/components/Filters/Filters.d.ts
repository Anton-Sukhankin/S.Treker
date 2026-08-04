import React from 'react';
import { GenericObject } from '../../types/GenericObject';
import { FiltersProps } from './types';
import { FilterComponent, FilterConfig } from './core/types';
type FilterPickerProps = FilterComponent & {
    INTERNAL_scope?: string;
    config: FilterConfig;
};
export declare const FilterPicker: React.NamedExoticComponent<FilterPickerProps>;
/**
 * @deprecated Компонент устарел и больше не поддерживается. Используйте компонент из пакета `@10d/tend-ui-filters`
 */
declare const Filters: {
    <T extends GenericObject = GenericObject>({ value, debounce, loading, open, name, title, filters, form, onFilterValuesChange, onClose, onFiltersReset, onFilterReset, resetAllButtonProps, INTERNAL_scope, showPresets, presets, defaultPresets, onPresetEdit, onPresetRemove, onPresetSave, onPresetsChange, }: FiltersProps<T>): React.JSX.Element;
    displayName: string;
    Root: {
        <T extends GenericObject = GenericObject>({ value, debounce, name, form, filters, children, onFilterValuesChange, onFilterReset, onFiltersReset, INTERNAL_scope, defaultPresets, presets, onPresetsChange, onPresetSave, onPresetEdit, onPresetRemove, }: import("./components/Root").RootProps<T>): React.JSX.Element;
        displayName: string;
    };
    Form: React.FC<{}>;
    List: React.FC<import("./components/List/types").ListProps>;
    CollapseGroup: React.FC<import("../../ui/Collapse").CollapseGroupProps>;
    Filter: ({ filter, INTERNAL_scope, }: {
        filter: FilterConfig;
        INTERNAL_scope?: string;
    }) => React.JSX.Element;
};
export { Filters };
