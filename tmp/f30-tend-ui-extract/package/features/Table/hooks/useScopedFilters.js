import React from 'react';
import { createScopedConfig } from '../tools/createScopedConfig.js';
import { Scope } from '../consts/Scope.js';

const useScopedFilters = (filters) => {
    const scoped = React.useMemo(() => filters.map(createScopedConfig(Scope.Filters)), [filters]);
    return scoped;
};

export { useScopedFilters };
