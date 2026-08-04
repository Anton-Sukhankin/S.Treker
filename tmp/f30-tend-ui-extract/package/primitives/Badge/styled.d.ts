import { BadgePreset as Preset } from './types';
export declare const Content: import("styled-components").StyledComponent<"span", import("styled-components").DefaultTheme, {}, never>;
export declare const Root: import("styled-components").StyledComponent<"span", import("styled-components").DefaultTheme, {}, never>;
export declare const Bubble: import("styled-components").StyledComponent<"span", import("styled-components").DefaultTheme, {
    $offset: number[];
    $preset: Preset;
    $shape: "status" | "dot" | "counter" | "bubble";
    $pointer: boolean;
    $placement?: "leftTop" | "rightTop" | "rightBottom" | "leftBottom";
    $padding?: string;
}, never>;
