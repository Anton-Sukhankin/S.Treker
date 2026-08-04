import React from 'react';
import { AnalyticsProps } from './types';
declare const Analytics: {
    ({ component: Component, href }: AnalyticsProps): React.JSX.Element;
    displayName: string;
};
export { Analytics };
