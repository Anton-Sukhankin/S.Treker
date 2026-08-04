import React from 'react';
import { LiteralUnion } from '@10d/tend-ui-types';
import { Colors } from '@10d/tend-ui-tokens';
import { BadgeProps } from '../../primitives/Badge';
export declare const status: readonly ["online", "offline", "away", "busy"];
export declare const sizes: readonly ["xl", "large", "medium", "small"];
export type AvatarSize = (typeof sizes)[number];
export type AvatarStatus = (typeof status)[number];
export type AvatarStylingSchema = {
    borderColor?: LiteralUnion<keyof Colors>;
};
export type AvatarRef = HTMLSpanElement;
export type AvatarProps = Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src'> & {
    /**
     * Отображать ли курсор `pointer` при наведении
     */
    pointer?: boolean;
    /**
     * Отображать обводку
     */
    bordered?: boolean;
    /**
     * `url` аватара
     */
    src?: string | string[];
    /**
     * Размер
     */
    size?: AvatarSize;
    /**
     * Статус в левом нижнем углу
     */
    status?: AvatarStatus | Pick<BadgeProps, 'preset' | 'offset' | 'placement'>;
    /**
     * Тип позиционирования изображения внутри контейнера
     */
    fit?: 'contain' | 'cover';
    /**
     * @deprecated Экспериментальное API
     * Не используйте это в продакшене
     */
    UNSTABLE_styling?: AvatarStylingSchema;
};
