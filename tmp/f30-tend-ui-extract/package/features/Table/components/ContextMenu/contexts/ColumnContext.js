import { contextFactory } from '@10d/tend-ui-factories';
import React from 'react';

const [_ColumnsContext, _useColumnContext] = contextFactory();
const ColumnsContext = ({ value, children, }) => {
    return (React.createElement(_ColumnsContext, { value: React.useMemo(() => value, [value]) }, children));
};
const useColumnContext = () => {
    return _useColumnContext();
};

export { ColumnsContext, useColumnContext };
