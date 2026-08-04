import { BackgroundColor, Pointer } from '@10d/tend-ui-styling';
import { AvatarSize } from '../../types';
declare const Root: import("styled-components").StyledComponent<"span", import("styled-components").DefaultTheme, {
    $sizes: {
        xl: import("styled-components").FlattenSimpleInterpolation;
        large: import("styled-components").FlattenSimpleInterpolation;
        medium: import("styled-components").FlattenSimpleInterpolation;
        small: import("styled-components").FlattenSimpleInterpolation;
    };
} & Pointer & BackgroundColor & {
    $borderColor?: string;
    $size: AvatarSize;
    $bordered?: boolean;
}, "$sizes">;
export { Root };
