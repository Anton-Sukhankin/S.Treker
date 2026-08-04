import { useSortable } from '@dnd-kit/sortable';
type UseSortableReturn = ReturnType<typeof useSortable>;
type ColumnsSettingContextType = Pick<UseSortableReturn, 'listeners' | 'attributes' | 'setActivatorNodeRef'>;
/**
 * @internal Not for public usage
 */
export declare const ColumnsSettingContext: import("react").Provider<ColumnsSettingContextType | undefined>, useColumnsSettingContext: (consumer?: string) => ColumnsSettingContextType;
export {};
