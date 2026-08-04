import { InputProps, InputRef } from '../../primitives/Input';
export type SearchRef = InputRef;
export type SearchProps = Omit<InputProps, 'prefix'> & {
    onSearch?: (search: string) => void;
};
