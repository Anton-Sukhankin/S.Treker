import React from 'react';
import { AxiosInstance } from 'axios';
type TendUIProps = {
    lang?: 'ru' | 'en';
    theme?: 'samolet' | 'global';
    client?: AxiosInstance;
};
declare const TendUI: {
    ({ lang, theme, client, children, }: React.PropsWithChildren<TendUIProps>): React.JSX.Element;
    init(theme?: import("./types").ThemeSchema): void;
};
export { TendUI };
