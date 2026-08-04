import React from 'react';
import { ButtonProps } from '../../primitives/Button';
export declare const statuses: readonly [403, 404, 500];
export type Status = (typeof statuses)[number];
export type StatusProps = {
    status?: Status;
    title?: React.ReactNode;
    description?: React.ReactNode;
    content?: React.ReactNode;
    button?: ButtonProps<'button'>;
    onClick?: () => void;
};
