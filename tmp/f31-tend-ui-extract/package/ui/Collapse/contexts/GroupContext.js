import React from 'react';

const GroupContext = React.createContext(undefined);
const useGroupContext = () => React.useContext(GroupContext);

export { GroupContext, useGroupContext };
