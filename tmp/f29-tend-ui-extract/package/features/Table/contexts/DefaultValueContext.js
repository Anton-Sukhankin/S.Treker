import React from 'react';

const DefaultValueContext = React.createContext(undefined);
const useDefaultValueContext = () => React.useContext(DefaultValueContext);

export { DefaultValueContext, useDefaultValueContext };
