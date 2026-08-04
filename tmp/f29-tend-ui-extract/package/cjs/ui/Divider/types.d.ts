import { Colors } from '@10d/tend-ui-tokens';
import { LiteralUnion } from '@10d/tend-ui-types';
export type DividerProps = {
    variant?: 'horizontal' | 'vertical';
    className?: string;
    margin?: string;
    padding?: string;
    height?: string;
    color?: LiteralUnion<keyof Colors>;
};
