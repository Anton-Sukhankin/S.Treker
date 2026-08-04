import React from 'react';
import { ColumnConfig } from '../../../../components/ColumnsSettings/core';
declare const PresetsList: {
    <T extends ColumnConfig = ColumnConfig>({ columns, }: {
        columns: T[];
    }): React.JSX.Element;
    displayName: string;
};
export { PresetsList };
