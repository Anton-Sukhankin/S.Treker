import React from 'react';
import { TableForm } from '../../../features/Table/types';
import { GenericObject } from '../../../types';
type DefaultValueContextType<T extends GenericObject = GenericObject> = Partial<TableForm<T>>;
declare const DefaultValueContext: React.Context<Partial<TableForm<GenericObject>> | undefined>;
declare const useDefaultValueContext: <T extends GenericObject = GenericObject>() => DefaultValueContextType<T>;
export { DefaultValueContext, useDefaultValueContext };
export type { DefaultValueContextType };
