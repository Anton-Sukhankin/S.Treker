export declare const useMap: () => {
    set: <D = unknown>(key: string, value: D) => D;
    get: <D = unknown>(key: string) => D;
    del: (key: string) => unknown;
    has: (key: string) => boolean;
    clear: () => void;
};
