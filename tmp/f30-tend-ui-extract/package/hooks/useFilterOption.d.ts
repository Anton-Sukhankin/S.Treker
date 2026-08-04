type Option = any;
export type FilterOption = (search: string, option?: Option) => boolean;
export declare const useFilterOption: <T>(props: {
    search: string;
    options: T[];
    filterOption: boolean | FilterOption;
    filterOptionProp: string;
}) => T[];
export {};
