import React from 'react';
import { CellTitleProps } from './types';
declare const CellTitle: React.FC<CellTitleProps> & {
    displayName: string;
    FilterIndicator: {
        ({ id }: {
            id: string;
        }): React.JSX.Element | null;
        displayName: string;
    };
    SorterIndicator: {
        ({ id }: {
            id: string;
        }): React.JSX.Element | null;
        displayName: string;
    };
};
export { CellTitle };
