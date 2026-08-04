import React from 'react';
import { TooltipProps } from '../primitives/Tooltip/types';
type AllowClear = {
    allowClear?: boolean;
    clearIconTooltip?: TooltipProps;
};
/**
 * @deprecated Используйте `useAllowClear` из `@10d/tend-ui-primitives`
 */
export declare const useAllowClear: <T extends AllowClear>({ allowClear, clearIconTooltip, }: T) => false | {
    clearIcon: React.JSX.Element;
} | undefined;
export {};
