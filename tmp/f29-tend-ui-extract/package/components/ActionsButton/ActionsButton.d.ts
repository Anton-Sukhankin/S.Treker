import React from 'react';
import { ActionsButtonProps } from './types';
declare const ActionsButton: {
    ({ children, ...props }: ActionsButtonProps): React.JSX.Element;
    displayName: string;
    Root: {
        ({ items, onOpenChange, ...props }: import("./components/Root").RootProps): React.JSX.Element;
        displayName: string;
    };
    Trigger: {
        ({ children, onClick, ...props }: import("./components/Trigger").TriggerProps): React.JSX.Element;
        displayName: string;
    };
};
export { ActionsButton };
