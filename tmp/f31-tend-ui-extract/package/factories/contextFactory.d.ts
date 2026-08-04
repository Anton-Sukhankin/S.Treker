import React from 'react';
export declare function contextFactory<T>(provider?: string, initial?: T): readonly [React.Provider<T | undefined>, (consumer?: string) => NonNullable<T>];
