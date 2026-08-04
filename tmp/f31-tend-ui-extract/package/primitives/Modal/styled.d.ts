import { DefaultTheme } from 'styled-components';
export declare const Root: import("styled-components").StyledComponent<import("react").FC<import("antd-core").ModalProps>, DefaultTheme, {
    $layout: {
        window: import("styled-components").FlattenSimpleInterpolation;
        body: import("styled-components").FlattenInterpolation<import("styled-components").ThemedStyledProps<{
            $theme?: DefaultTheme;
        }, DefaultTheme>>;
    };
} & {
    $theme: DefaultTheme;
    $scroll: "window" | "body";
    $noFooter: boolean;
}, "$layout">;
