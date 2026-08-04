import { contextFactory } from '../../../factories/contextFactory.js';

const [FiltersContext, _useFiltersContext] = contextFactory('Table.FiltersContext');
const useFiltersContext = () => {
    const ctx = _useFiltersContext();
    return ctx;
};

export { FiltersContext, useFiltersContext };
