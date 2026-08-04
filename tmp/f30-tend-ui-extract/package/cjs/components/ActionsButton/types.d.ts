import { DropdownProps } from '../../primitives/Dropdown';
type Items = NonNullable<DropdownProps['menu']>['items'];
export type ActionsButtonProps = Omit<DropdownProps, 'content'> & {
    items?: Items;
};
export {};
