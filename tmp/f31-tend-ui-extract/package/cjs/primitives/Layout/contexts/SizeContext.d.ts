import { Size } from '../../../types/Size';
type SizeContextType = {
    size: Size;
};
export declare const SizeContext: import("react").Provider<SizeContextType | undefined>, useSizeContext: (consumer?: string) => SizeContextType;
export {};
