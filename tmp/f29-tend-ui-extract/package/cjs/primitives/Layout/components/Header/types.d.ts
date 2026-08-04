import { MarginProperties, PaddingProperties } from '@10d/tend-ui-styling';
import React from 'react';
export type HeaderProps = React.ComponentPropsWithoutRef<'header'> & MarginProperties & PaddingProperties & {
    sticky?: boolean;
};
