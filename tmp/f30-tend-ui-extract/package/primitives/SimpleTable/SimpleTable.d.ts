import React from 'react';
import { SimpleTableProps } from './types';
export declare const SimpleTable: React.ForwardRefExoticComponent<Omit<SimpleTableProps, "ref"> & React.RefAttributes<HTMLTableElement>> & {
    displayName: string;
    Thead: React.ForwardRefExoticComponent<Omit<Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLTableSectionElement>, HTMLTableSectionElement>, "ref"> & {
        ref?: ((instance: HTMLTableSectionElement | null) => void) | React.RefObject<HTMLTableSectionElement> | null | undefined;
    }, "ref"> & React.RefAttributes<HTMLTableSectionElement>>;
    Tbody: React.ForwardRefExoticComponent<Omit<Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLTableSectionElement>, HTMLTableSectionElement>, "ref"> & {
        ref?: ((instance: HTMLTableSectionElement | null) => void) | React.RefObject<HTMLTableSectionElement> | null | undefined;
    }, "ref"> & React.RefAttributes<HTMLTableSectionElement>>;
    Tr: React.ForwardRefExoticComponent<Omit<import("./Tr").TrProps, "ref"> & React.RefAttributes<HTMLTableRowElement>>;
    Th: React.ForwardRefExoticComponent<Omit<import("./Th").ThProps, "ref"> & React.RefAttributes<HTMLTableHeaderCellElement>>;
    Td: React.ForwardRefExoticComponent<Omit<import("./Td").TdProps, "ref"> & React.RefAttributes<HTMLTableDataCellElement>>;
};
