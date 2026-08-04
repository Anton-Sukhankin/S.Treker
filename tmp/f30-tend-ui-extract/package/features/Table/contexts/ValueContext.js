import React from 'react';

const ValueContext = React.createContext(undefined);
const useValueContext = () => React.useContext(ValueContext);

export { ValueContext, useValueContext };
