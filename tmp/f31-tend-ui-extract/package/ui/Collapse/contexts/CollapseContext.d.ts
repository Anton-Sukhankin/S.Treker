type CollapseContextType = {
    open: boolean;
    onClick: () => void;
};
export declare const CollapseContext: import("react").Provider<CollapseContextType | undefined>, useCollapseContext: (consumer?: string) => CollapseContextType;
export {};
