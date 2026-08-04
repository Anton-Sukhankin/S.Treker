import { Profile } from '../../../types/Profile';
type LayoutContextType = {
    authenticated: boolean;
    stand: 'stage' | 'prod';
    profile?: Profile;
};
export declare const LayoutContext: import("react").Provider<LayoutContextType | undefined>, useLayoutContext: (consumer?: string) => LayoutContextType;
export {};
