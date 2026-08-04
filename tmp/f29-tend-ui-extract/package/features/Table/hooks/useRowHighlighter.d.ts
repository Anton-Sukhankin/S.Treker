type Predicate<T> = (record: T) => boolean;
type RowClassName<T> = (record: T) => string;
type Options<T> = {
    onError?: Predicate<T>;
    onWarning?: Predicate<T>;
    onSuccess?: Predicate<T>;
};
export declare const useRowHighlighter: <T>(options?: Options<T>) => RowClassName<T>;
export {};
