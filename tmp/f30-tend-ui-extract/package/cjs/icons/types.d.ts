import React from 'react';
import { CursorProperties, MarginProperties, PaddingProperties } from '@10d/tend-ui-styling';
import { Colors } from '../theme/types/Colors';
import { LiteralUnion } from '../types/LiteralUnion';
/**
 * @deprecated Мигрировать на `@10d/tend-ui-icons`
 */
export type IconProps = React.ComponentPropsWithoutRef<'span'> & MarginProperties & CursorProperties & PaddingProperties & {
    color?: LiteralUnion<keyof Colors>;
    size?: number;
};
