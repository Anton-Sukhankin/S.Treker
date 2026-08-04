import React from 'react';

/**
 * @private Not for public usage
 */
const TourContext = React.createContext(undefined);
/**
 * @private Not for public usage
 */
const useTourContext = () => React.useContext(TourContext);

export { TourContext, useTourContext };
