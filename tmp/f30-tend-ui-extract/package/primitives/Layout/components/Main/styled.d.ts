import { Size } from '../../../../types/Size';
export declare const Root: import("styled-components").StyledComponent<"main", import("styled-components").DefaultTheme, {
    $backgrounds: {
        white: import("styled-components").FlattenInterpolation<import("styled-components").ThemeProps<import("styled-components").DefaultTheme>>;
        blue: import("styled-components").FlattenInterpolation<import("styled-components").ThemeProps<import("styled-components").DefaultTheme>>;
    };
    $sizes: {
        small: import("styled-components").FlattenSimpleInterpolation;
        medium: import("styled-components").FlattenSimpleInterpolation;
        large: import("styled-components").FlattenSimpleInterpolation;
    };
} & {
    $size: Size;
    $background: "white" | "blue";
}, "$sizes" | "$backgrounds">;
