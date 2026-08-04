import React from 'react';
import { MarginProperties } from '@10d/tend-ui-styling';
import { Size } from '../../types/Size';
export type SimpleTableRef = React.ElementRef<'table'>;
export type SimpleTableProps = React.ComponentPropsWithRef<'table'> & MarginProperties & {
    loading?: boolean;
    size?: Size;
};
