import React from 'react';
import { ItemProps } from './types';
declare const Item: {
    <T = unknown>({ children, width, ...props }: ItemProps<T>): React.JSX.Element;
    displayName: string;
    useStatus: () => {
        status?: ValidateStatus;
        errors: React.ReactNode[];
        warnings: React.ReactNode[];
    };
};
export { Item };
