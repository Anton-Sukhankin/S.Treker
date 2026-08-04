import React from 'react';
declare const Search: React.ForwardRefExoticComponent<Omit<import("../../primitives/Input").InputProps, "prefix"> & {
    onSearch?: (search: string) => void;
} & React.RefAttributes<import("rc-input").InputRef>>;
export { Search };
