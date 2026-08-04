import React from 'react';
import AntModal from 'antd-core/es/modal/Modal';
import { ButtonProps } from '../../primitives/Button/types';
import { TooltipProps } from '../../primitives/Tooltip';
type AntModalProps = React.ComponentPropsWithoutRef<typeof AntModal>;
export type ModalProps = Omit<AntModalProps, 'closeIcon' | 'okButtonProps' | 'cancelButtonProps' | 'footer' | 'title'> & {
    title?: React.ReactNode | React.ReactNode[];
    scroll?: 'window' | 'body';
    size?: 'large' | 'medium' | 'small';
    okButtonProps?: Omit<ButtonProps<'button'>, 'ref'>;
    cancelButtonProps?: Omit<ButtonProps<'button'>, 'ref'>;
    footer?: React.ReactNode | React.ReactNode[];
    closeIconTooltip?: Omit<TooltipProps, 'children'>;
};
export {};
