import React from 'react';
import { useDefaultValueContext } from '../contexts/DefaultValueContext.js';

const useTableDefaultValue = (id) => {
    const value = useDefaultValueContext();
    return React.useMemo(() => { var _a, _b; return ({ filter: (_a = value === null || value === void 0 ? void 0 : value.filters) === null || _a === void 0 ? void 0 : _a[id], sorter: (_b = value === null || value === void 0 ? void 0 : value.sorters) === null || _b === void 0 ? void 0 : _b[id] }); }, [value === null || value === void 0 ? void 0 : value.filters, value === null || value === void 0 ? void 0 : value.sorters, id]);
};

export { useTableDefaultValue };
