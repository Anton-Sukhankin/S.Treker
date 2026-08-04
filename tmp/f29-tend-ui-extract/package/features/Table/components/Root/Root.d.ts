import React from 'react';
import { GenericObject } from '../../../../types/GenericObject';
import { ColumnConfig } from '../../../../components/ColumnsSettings/types';
import { RootProps } from './types';
declare const Root: {
    <TFilter extends GenericObject = GenericObject, TColumn extends ColumnConfig = ColumnConfig>({ debounce, form, value, defaultValue, columns, filters, sorters, children, onFilterValuesChange, onSorterValuesChange, onSearchValueChange, onColumnVisibilityChange, onColumnPinningChange, onFilterReset, onFiltersReset, }: RootProps<TFilter, TColumn>): React.JSX.Element;
    displayName: string;
};
export { Root };
