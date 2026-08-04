import { DefaultTheme } from 'styled-components';
export declare const PaginationButton: import("styled-components").StyledComponent<"span", DefaultTheme, {
    $variant: {
        medium: string;
        small: string;
    };
} & {
    $size: "small" | "medium";
}, "$variant">;
export declare const Root: import("styled-components").StyledComponent<import("react").FC<import("antd-core/es/pagination").PaginationProps>, DefaultTheme, {
    $theme: DefaultTheme;
    $singlePage?: boolean;
}, never>;
