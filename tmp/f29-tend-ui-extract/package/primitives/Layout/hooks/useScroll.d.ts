import React from 'react';
/**
 * Хук для скроллинга страницы
 */
export declare const useScroll: () => {
    register: (key: string, target: React.MutableRefObject<HTMLElement | null>) => void;
    scroll: (key: string) => void;
};
