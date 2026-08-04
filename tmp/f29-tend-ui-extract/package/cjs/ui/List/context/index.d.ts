import React from 'react';
type ContextType<T extends string = string> = {
    onItemClick?: (value?: T) => void;
};
/**
 * @internal Not for public usage
 */
export declare const ListContext: React.Context<ContextType<any> | undefined>;
/**
 * @internal Not for public usage
 */
export declare const useListContext: <T extends string = string>() => ContextType<T> | undefined;
export {};
