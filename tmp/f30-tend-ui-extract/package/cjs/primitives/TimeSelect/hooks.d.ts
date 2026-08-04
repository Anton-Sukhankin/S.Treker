type Options = {
    from?: number;
    to?: number;
    step?: {
        hour?: number;
        minute?: number;
    };
};
export declare const useTimeOptions: (options?: Options) => {
    value: string;
    label: string;
}[];
export {};
