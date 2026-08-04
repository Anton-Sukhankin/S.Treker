import React from 'react';
import AntTypography from 'antd-core/es/typography';
import { Colors } from '../theme/types/Colors';
import { LiteralUnion } from '../types/LiteralUnion';
export declare const sizes: readonly ["large", "medium", "small", "xs"];
export type Size = (typeof sizes)[number];
export type BaseTypographyProps = {
    uppercase?: boolean;
    color?: LiteralUnion<keyof Colors>;
    textAlign?: React.CSSProperties['textAlign'];
};
export type TypographyProps = React.ComponentPropsWithoutRef<typeof AntTypography>;
