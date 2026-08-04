import React from 'react';
type Options<T> = {
    title?: string;
    onChange?: (e: React.ChangeEvent<T>) => void;
};
/**
 * @deprecated Используйте `useInputTitle` из `@10d/tend-ui-primitives`
 */
export declare const useInputTitle: <T extends HTMLInputElement | HTMLTextAreaElement>({ title, onChange, }: Options<T>) => {
    title: string;
    onChange: (e: React.ChangeEvent<T>) => void;
};
export {};
