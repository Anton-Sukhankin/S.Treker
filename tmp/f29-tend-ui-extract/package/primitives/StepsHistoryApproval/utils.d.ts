import React from 'react';
import { TVariant } from '../Steps/types';
/**
 * Склоняет слово после числительного по правилам русского языка.
 *
 * @param number - Число, на основе которого определяется форма слова.
 *                 Работает с целыми числами, включая отрицательные.
 * @param words - Массив форм слова в порядке:
 *                [1 предмет (именительный падеж),
 *                 2 предмета (родительный падеж ед.ч.),
 *                 5 предметов (родительный падеж мн.ч.)].
 *                Например: ['комментарий', 'комментария', 'комментариев'].
 * @param expectZero - Если `true`, то при `number = 0` вернёт `words[2]` (множественное число).
 *                     Если `false` (по умолчанию), вернёт пустую строку.
 * @returns Одна из форм слова в зависимости от числа.
 *
 * @example
 * declOfNum(1, ['яблоко', 'яблока', 'яблок']) // → 'яблоко'
 * declOfNum(3, ['яблоко', 'яблока', 'яблок']) // → 'яблока'
 * declOfNum(5, ['яблоко', 'яблока', 'яблок']) // → 'яблок'
 * declOfNum(0, ['яблоко', 'яблока', 'яблок'], true) // → 'яблок'
 * declOfNum(-2, ['яблоко', 'яблока', 'яблок']) // → 'яблока'
 */
export declare const declOfNum: (number: number, words: string[], expectZero?: boolean) => string;
export declare const urlRegex: RegExp;
export declare const ICON_CONTAINER_SIZE: Record<TVariant, string>;
export declare const stepIcon: (variant: TVariant) => Record<string, React.ReactElement>;
export declare const isHistoryStepper: (current: number | undefined) => current is undefined;
export declare const src: never[];
export declare const ellipsis: {
    rows: number;
    expandable: boolean;
    symbol: string;
};
