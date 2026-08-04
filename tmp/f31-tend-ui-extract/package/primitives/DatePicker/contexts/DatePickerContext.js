import React from 'react';

const DatePickerContext = React.createContext(undefined);
const useDatePickerContext = () => React.useContext(DatePickerContext);

export { DatePickerContext, useDatePickerContext };
