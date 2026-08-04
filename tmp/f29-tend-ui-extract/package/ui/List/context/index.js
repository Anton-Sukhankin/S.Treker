import React from 'react';

/**
 * @internal Not for public usage
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ListContext = React.createContext(undefined);
/**
 * @internal Not for public usage
 */
const useListContext = () => {
    return React.useContext(ListContext);
};

export { ListContext, useListContext };
