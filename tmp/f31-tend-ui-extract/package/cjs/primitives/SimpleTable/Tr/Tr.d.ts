import React from 'react';
import { TrProps } from './types';
declare const Tr: React.ForwardRefExoticComponent<Omit<TrProps, "ref"> & React.RefAttributes<HTMLTableRowElement>>;
export { Tr };
