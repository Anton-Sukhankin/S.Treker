import { DebounceOptions } from '@10d/tend-ui-hooks';
import { FormInstance } from '../../components/Form/types';
import { DrawerProps } from '../../primitives/Drawer';
import { FormProps } from '../../components/Form';
import { ButtonProps } from '../../primitives/Button';
import { FilterConfig, FilterPreset, FilterValue } from './core/types';
export type CoreFiltersProps<T extends FilterValue = FilterValue> = {
    debounce?: boolean | DebounceOptions;
    value?: T;
    /**
     * Массив-конфигураций фильтров
     */
    filters: FilterConfig[];
    /**
     * @deprecated Низкоуровневое API, не использовать в продакшене
     * Только для нужд команды дизайн-системы
     */
    form?: FormInstance<T>;
    /**
     * @deprecated Низкоуровневое API, не использовать в продакшене
     * Только для нужд команды дизайн-системы
     */
    INTERNAL_scope?: string;
    /**
     * @deprecated Низкоуровневое API, не использовать в продакшене
     * Только для нужд команды дизайн-системы
     */
    name?: FormProps['name'];
    resetAllButtonProps?: Omit<ButtonProps, 'ref'>;
    /**
     * Вызывается при изменении фильтров
     * @param changed - измененный фильтр
     * @param values - все текущие выбранные фильтры
     */
    onFilterValuesChange?: (changed: Partial<T>, values: T) => void;
    /**
     * Вызывается при сбросе конкретного фильтра
     * @internal Не для публичного использования
     * @deprecated Устарел,  используйте просто `onFilterValuesChange`
     */
    onFilterReset?: (name: string) => void;
    /**
     * Вызывается при нажатии "Сбросить все фильтры"
     */
    onFiltersReset?: () => void;
    showPresets?: boolean;
    presets?: FilterPreset[];
    defaultPresets?: FilterPreset[];
    onPresetsChange?: (presets: FilterPreset[]) => void;
    onPresetSave?: (saved: FilterPreset) => void;
    onPresetEdit?: (edited: FilterPreset) => void;
    onPresetRemove?: (removed: FilterPreset) => void;
};
export type FiltersProps<T extends FilterValue = FilterValue> = CoreFiltersProps<T> & {
    loading?: boolean;
    /**
     * Заголовок
     */
    title?: DrawerProps['title'];
    /**
     * Открыт/закрыт
     */
    open?: DrawerProps['open'];
    onClose?: DrawerProps['onClose'];
};
