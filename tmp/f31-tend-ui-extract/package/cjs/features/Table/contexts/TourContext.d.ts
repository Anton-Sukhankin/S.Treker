import React from 'react';
/**
 * @private Not for public usage
 */
type TourContextType = {
    ui: {
        toolbar: React.RefObject<HTMLDivElement>;
        cell: React.RefObject<HTMLTableCellElement>;
        settingsButton: React.RefObject<HTMLButtonElement>;
        filtersButton: React.RefObject<HTMLButtonElement>;
        sortersButton: React.RefObject<HTMLButtonElement>;
    };
};
/**
 * @private Not for public usage
 */
declare const TourContext: React.Context<TourContextType | undefined>;
/**
 * @private Not for public usage
 */
declare const useTourContext: () => TourContextType | undefined;
export { TourContext, useTourContext };
export type { TourContextType };
