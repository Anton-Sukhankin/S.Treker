import React from 'react';
import { TriggerProps } from './types';
declare const Trigger: {
    ({ component: Component, onClick, ...props }: React.PropsWithChildren<TriggerProps>): React.JSX.Element;
    displayName: string;
};
export { Trigger };
