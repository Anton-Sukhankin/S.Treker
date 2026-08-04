import React from 'react';
import { ColumnConfig, ColumnPosition } from '../../../components/ColumnsSettings/core/interfaces';
import { ColumnsSettingsPreset, ColumnsSettingsPresets } from '../core/interfaces/ColumnsSettingsPreset';
interface UseColumnsParameters<T extends ColumnConfig = ColumnConfig> extends ColumnsSettingsPresets {
    /**
     * Уникальный ключ для хранения колонок в `localStorage`
     */
    localStorage?: string;
    /**
     * Начальные колонки
     */
    columns: T[];
    /**
     * Массив `id ` колонок для игнорирования
     */
    ignore?: string[];
    /**
     * Пресеты по умолчанию
     */
    defaultPresets?: ColumnsSettingsPreset[];
    /**
     * Вызывается при изменении пресетов
     */
    onPresetsChange?: (presets: ColumnsSettingsPreset[]) => void;
}
/**
 * @deprecated Хук устарел и больше не поддерживается.
 * Используйте хук из пакета `@10d/tend-ui-columns-settings`.
 */
export declare const useColumns: <T extends ColumnConfig = ColumnConfig>(parameters: T[] | UseColumnsParameters<T>) => readonly [T[], {
    readonly columns: T[];
    readonly set: React.Dispatch<React.SetStateAction<T[]>>;
    readonly swap: (from: number, to: number) => void;
    readonly pin: (position: ColumnPosition, column: T) => void;
    readonly unpin: (column: T) => void;
    readonly reset: () => void;
    readonly display: (visible: boolean, column: T) => void;
    readonly presets: ColumnsSettingsPreset[];
    readonly savePreset: (payload: ColumnsSettingsPreset) => void;
    readonly editPreset: (payload: ColumnsSettingsPreset) => void;
    readonly removePreset: (id: string) => void;
    readonly applyPreset: (payload: ColumnsSettingsPreset) => void;
}];
export {};
