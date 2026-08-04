import { ButtonProps } from '../../../../primitives/Button';
export type TriggerProps = Omit<ButtonProps<'button'>, 'before' | 'after'>;
