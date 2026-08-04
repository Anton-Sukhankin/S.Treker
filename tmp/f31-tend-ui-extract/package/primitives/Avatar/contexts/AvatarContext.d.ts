import { ImageLoadingStatus } from '../hooks/useImageLoadingStatus';
type AvatarContextType = {
    imageLoadingStatus: ImageLoadingStatus;
    onImageLoadingStatusChange(status: ImageLoadingStatus): void;
};
export declare const AvatarContext: import("react").Provider<AvatarContextType | undefined>, useAvatarContext: (consumer?: string) => AvatarContextType;
export {};
