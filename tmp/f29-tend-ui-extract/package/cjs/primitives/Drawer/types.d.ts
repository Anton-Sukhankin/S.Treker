import { DrawerProps as AntDrawerProps } from 'antd-core/es/drawer';
import React from 'react';
import { ButtonProps } from '../../primitives/Button';
export declare const sizes: readonly ["default", "medium", "large", "small"];
type Size = (typeof sizes)[number];
export type DrawerProps = Omit<AntDrawerProps, 'size'> & {
    fullscreen?: boolean;
    /**
     * FIXME: Удалить "default" значение из размерной сетки в следующем мажоре
     * Возможно нарушится обратная совместимость
     */
    size?: Size;
    /**
     * Слот перед заголовком
     */
    before?: React.ReactNode;
    /**
     * Слот над заголовком
     */
    above?: React.ReactNode;
    /**
     * Текст под заголовком
     */
    description?: React.ReactNode;
    okText?: React.ReactNode;
    okButtonProps?: Omit<ButtonProps<'button'>, 'ref'>;
    onOk?: () => void;
    cancelText?: React.ReactNode;
    cancelButtonProps?: Omit<ButtonProps<'button'>, 'ref'>;
    onCancel?: () => void;
};
export {};
