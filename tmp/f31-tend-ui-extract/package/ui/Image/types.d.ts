import { LayoutProperties } from '@10d/tend-ui-styling';
import React from 'react';
export type ImageProps = React.ComponentPropsWithoutRef<'img'> & LayoutProperties & {
    rootClassName?: string;
};
