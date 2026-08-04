import { contextFactory } from '../../../factories/contextFactory.js';

const [ColumnsContext, _useColumnsContext] = 
// eslint-disable-next-line @typescript-eslint/no-explicit-any
contextFactory('Table.ColumnsContext');
const useColumnsContext = () => {
    const ctx = _useColumnsContext();
    return ctx;
};

export { ColumnsContext, useColumnsContext };
