import { DropdownProps } from '../../../../primitives/Dropdown';
type Items = NonNullable<DropdownProps['menu']>['items'];
export type RootProps = DropdownProps & {
    items?: Items;
};
export {};
