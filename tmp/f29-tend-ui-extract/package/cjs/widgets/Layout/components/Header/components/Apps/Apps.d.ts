import React from 'react';
import { AppProps } from './types';
declare const Apps: {
    ({ exclude, selected, available, include, hrefs, allAppsHref, ...props }: AppProps): React.JSX.Element;
    displayName: string;
};
export { Apps };
