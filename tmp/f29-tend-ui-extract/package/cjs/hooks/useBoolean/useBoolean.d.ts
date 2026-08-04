type InitialState = boolean | (() => boolean);
export declare const useBoolean: (initialState?: InitialState) => readonly [boolean, (value?: boolean) => void];
export {};
