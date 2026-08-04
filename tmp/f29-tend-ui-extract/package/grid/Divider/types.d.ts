import React from 'react';
import AntDivider from 'antd-core/es/divider';
import { LiteralUnion } from '@10d/tend-ui-types';
import { Colors } from '@10d/tend-ui-tokens';
type AntDividerProps = React.ComponentPropsWithoutRef<typeof AntDivider>;
export type DividerProps = AntDividerProps & {
    color?: LiteralUnion<keyof Colors>;
    margin?: React.CSSProperties['margin'];
};
export {};
