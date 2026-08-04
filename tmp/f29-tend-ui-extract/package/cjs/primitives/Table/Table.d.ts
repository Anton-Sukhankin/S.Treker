import React from 'react';
import { GenericObject } from '@10d/tend-ui-types';
import { TableProps, TableRef } from './types';
declare const Table: (<T extends GenericObject = GenericObject>(props: TableProps<T> & {
    ref?: React.ForwardedRef<TableRef>;
}) => React.JSX.Element) & Pick<React.FC<{}>, "displayName"> & {
    displayName: string;
    TextCell: {
        ({ children, width }: import("./components/TextCell/types").TextCellProps): React.JSX.Element;
        displayName: string;
    };
    TextHeader: {
        ({ children, width }: import("./components/TextHeader/types").TextHeaderProps): React.JSX.Element;
        displayName: string;
    };
    Summary: typeof import("rc-table/lib/Footer/Summary").default;
};
export { Table };
