import React from 'react';

const DatePickerVisibilityContext = React.createContext(undefined);
const useDatePickerVisibilityContext = () => React.useContext(DatePickerVisibilityContext);

export { DatePickerVisibilityContext, useDatePickerVisibilityContext };
