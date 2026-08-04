import React from 'react';
import { useColumnsContext } from '../contexts/ColumnsContext.js';

const useTableColumns = () => {
    const { columns, pin, display } = useColumnsContext();
    const api = React.useMemo(() => ({
        columns,
        pin,
        display,
    }), [columns, display, pin]);
    return api;
};

export { useTableColumns };
