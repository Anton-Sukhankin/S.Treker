import React from 'react';
import { List } from '../../../../../../../../ui/List';
import { ItemProps } from './types';
type AscendingProps = React.ComponentPropsWithoutRef<typeof List.Item>;
type DescendingProps = React.ComponentPropsWithoutRef<typeof List.Item>;
declare const ToggleSorter: {
    ({ value, onChange, children }: ItemProps): React.JSX.Element;
    displayName: string;
    Layout: React.FC<{}>;
    Ascending: ({ ...rest }: AscendingProps) => React.JSX.Element;
    Descending: ({ ...rest }: DescendingProps) => React.JSX.Element;
};
export { ToggleSorter };
