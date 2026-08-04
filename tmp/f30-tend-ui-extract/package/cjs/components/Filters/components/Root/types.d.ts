import React from 'react';
import { GenericObject } from '../../../../types/GenericObject';
import { CoreFiltersProps } from '../../../../components/Filters/types';
export type RootProps<T extends GenericObject = GenericObject> = CoreFiltersProps<T> & {
    children?: React.ReactNode;
};
