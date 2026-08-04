import { LayoutProperties, MarginProperties, PaddingProperties } from '@10d/tend-ui-styling';
import React from 'react';
import { Size } from '../../types/Size';
export type SkeletonProps = MarginProperties & PaddingProperties & LayoutProperties & {
    skeleton?: boolean;
    size?: Size;
    display?: React.CSSProperties['display'];
    borderRadius?: React.CSSProperties['borderRadius'];
    backgroundColor?: string;
    className?: string;
};
