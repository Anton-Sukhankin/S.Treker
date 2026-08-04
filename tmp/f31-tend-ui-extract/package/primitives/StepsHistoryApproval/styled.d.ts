import type { ComponentType } from 'react';
import { DefaultTheme } from 'styled-components';
type StepIconProps = {
    className?: string;
    'data-status'?: string;
    size?: number | string;
    variant: string;
};
export declare const Steps: import("styled-components").StyledComponent<import("react").FC<import("antd-core/es/steps").StepsProps> & {
    Step: typeof import("rc-steps").default.Step;
}, DefaultTheme, {
    $theme: DefaultTheme;
}, never>;
export declare const ActiveStepIcon: import("styled-components").StyledComponent<"div", DefaultTheme, {
    variant: string;
}, never>;
export declare const FutureStepIcon: import("styled-components").StyledComponent<"div", DefaultTheme, {
    variant: string;
}, never>;
export declare const DoneStepIcon: import("styled-components").StyledComponent<import("react").ForwardRefExoticComponent<Omit<import("@tend-ui-icons/types").IconProps, "children"> & import("react").RefAttributes<HTMLSpanElement>>, DefaultTheme, {
    variant: string;
}, never>;
export declare const ErrorStepIcon: import("styled-components").StyledComponent<ComponentType<StepIconProps>, DefaultTheme, StepIconProps, never>;
export declare const DisabledStepIcon: import("styled-components").StyledComponent<"div", DefaultTheme, {
    variant: string;
}, never>;
export declare const FinishedStepIcon: import("styled-components").StyledComponent<import("react").ForwardRefExoticComponent<Omit<import("@tend-ui-icons/types").IconProps, "children"> & import("react").RefAttributes<HTMLSpanElement>>, DefaultTheme, {
    'data-status': "finish";
} & {
    variant: string;
}, "data-status">;
export {};
