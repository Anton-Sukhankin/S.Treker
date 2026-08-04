import React from 'react';
import { Size } from '../../../../types/Size';
export type RootProps = React.ComponentPropsWithoutRef<'div'> & {
    size?: Size;
};
