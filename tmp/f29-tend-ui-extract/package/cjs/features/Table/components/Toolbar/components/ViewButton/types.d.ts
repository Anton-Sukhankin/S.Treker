import { ToggleButtonProps } from '../../../../../../primitives/ToggleButton';
export type View = 'list' | 'table';
export type ViewButtonProps = ToggleButtonProps & {
    onViewChange?: (view: View) => void;
};
