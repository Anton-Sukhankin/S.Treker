import React from 'react';
import { Scope } from '../consts/Scope.js';
import { createScopedConfig } from '../tools/createScopedConfig.js';

const useScopedSorters = (sorters) => {
    const scoped = React.useMemo(() => sorters.map(createScopedConfig(Scope.Sorters)), [sorters]);
    return scoped;
};

export { useScopedSorters };
