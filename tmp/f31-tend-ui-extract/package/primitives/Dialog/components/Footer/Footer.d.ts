import React from 'react';
import { DialogMethodProps } from '../../types';
type FooterProps = DialogMethodProps & {
    destroy: () => void;
    padding?: string;
};
export declare const Footer: (props: FooterProps) => React.JSX.Element;
export {};
