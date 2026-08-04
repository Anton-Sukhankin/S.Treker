import React from 'react';
import { TableForm } from '../../../features/Table/types';
import { GenericObject } from '../../../types';
type ValueContextType<T extends GenericObject = GenericObject> = Partial<TableForm<T>>;
declare const ValueContext: React.Context<Partial<TableForm<GenericObject>> | undefined>;
declare const useValueContext: <T extends GenericObject = GenericObject>() => ValueContextType<T>;
export { ValueContext, useValueContext };
export type { ValueContextType };
