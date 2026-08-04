'use strict';

var contextFactory = require('../../../factories/contextFactory.js');

const [ColumnsContext, _useColumnsContext] = 
// eslint-disable-next-line @typescript-eslint/no-explicit-any
contextFactory.contextFactory('Table.ColumnsContext');
const useColumnsContext = () => {
    const ctx = _useColumnsContext();
    return ctx;
};

exports.ColumnsContext = ColumnsContext;
exports.useColumnsContext = useColumnsContext;
