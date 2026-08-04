import { TabsProps } from '../../../primitives/Tabs';
type TabsContextType = Omit<TabsProps, 'items'> & {
    items: NonNullable<TabsProps['items']>;
};
export declare const TabsContext: import("react").Provider<TabsContextType | undefined>, useTabsContext: (consumer?: string) => NonNullable<TabsContextType>;
export {};
