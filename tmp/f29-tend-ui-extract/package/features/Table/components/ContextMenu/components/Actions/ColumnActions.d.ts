import React from 'react';
import { ColumnConfig } from '../../../../../../features/Table/types';
declare const ColumnActions: {
    <T extends ColumnConfig = import("../../../../../../components").ColumnConfig>(): React.JSX.Element;
    displayName: string;
    Layout: React.FC<{}>;
    PinningButton: {
        ({ pinned, onChange, onClick, disabled }: import("./components/PinningButton").PinningButtonProps): React.JSX.Element;
        displayName: string;
    };
    HidingButton: {
        ({ onClick, disabled }: import("./components/HidingButton").HidingButtonProps): React.JSX.Element;
        displayName: string;
    };
};
export { ColumnActions };
