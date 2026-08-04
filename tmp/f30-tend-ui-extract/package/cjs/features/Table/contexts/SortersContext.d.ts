import { SorterConfig } from '../../../features/Table/types';
type SortersContextType = {
    sorters: SorterConfig[];
};
declare const SortersContext: import("react").Provider<SortersContextType | undefined>, useSortersContext: (consumer?: string) => SortersContextType;
export { SortersContext, useSortersContext };
export type { SortersContextType };
