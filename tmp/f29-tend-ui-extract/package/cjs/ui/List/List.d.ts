import React from 'react';
import { ListProps, ListRef } from './types';
export declare const List: (<T extends string = string>(props: ListProps<T> & {
    ref?: React.ForwardedRef<ListRef>;
}) => React.ReactElement) & Pick<React.FC<{}>, "displayName"> & {
    displayName: string;
    Item: import("./Item/types").ItemComponent;
};
