import React from 'react';
import { GenericObject } from '../../../../types/GenericObject';
import { RootProps } from './types';
declare const Root: {
    <T extends GenericObject = GenericObject>({ value, debounce, name, form, filters, children, onFilterValuesChange, onFilterReset, onFiltersReset, INTERNAL_scope, defaultPresets, presets, onPresetsChange, onPresetSave, onPresetEdit, onPresetRemove, }: RootProps<T>): React.JSX.Element;
    displayName: string;
};
export { Root };
