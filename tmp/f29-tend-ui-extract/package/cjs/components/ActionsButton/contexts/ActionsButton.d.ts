type ActionsButtonContextType = {
    open: boolean;
    display: (visible: boolean) => void;
};
export declare const ActionsButtonContext: import("react").Provider<ActionsButtonContextType | undefined>, useActionsButtonContext: (consumer?: string) => ActionsButtonContextType;
export {};
