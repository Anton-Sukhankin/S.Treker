import React from 'react';
import { ChipsOption } from './types';
/**
 * @deprecated Компонент устарел и больше не поддерживается
 * Используйте `Chips` из пакета `@10d/tend-ui-primitives`
 */
declare const Chips: React.ForwardRefExoticComponent<Omit<Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref">, "onChange"> & {
    value?: ChipsOption[];
    options: ChipsOption[];
    onChange?: (option: ChipsOption, options: ChipsOption[]) => void;
} & React.RefAttributes<HTMLDivElement>>;
export { Chips };
