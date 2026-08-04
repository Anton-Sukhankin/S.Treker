import React from 'react';
import { ButtonProps } from '../../../../primitives/Button';
export type TriggerProps = ButtonProps<'button'> & {
    component?: React.ComponentType<any>;
};
