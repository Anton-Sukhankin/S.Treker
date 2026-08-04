import React from 'react';
import { MainProps } from './types';
declare const Main: {
    ({ children, className, background, ...props }: MainProps): React.JSX.Element;
    Title: {
        (props: import("./components").TitleProps): React.JSX.Element;
        displayName: string;
    };
    displayName: string;
};
export { Main };
