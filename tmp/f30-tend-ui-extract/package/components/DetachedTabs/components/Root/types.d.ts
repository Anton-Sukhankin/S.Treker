import { TabsProps } from '../../../../primitives/Tabs';
export type RootProps = Omit<TabsProps, 'items'> & {
    items: NonNullable<TabsProps['items']>;
};
