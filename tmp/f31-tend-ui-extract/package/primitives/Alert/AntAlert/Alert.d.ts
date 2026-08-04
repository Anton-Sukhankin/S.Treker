import React from 'react';
import { AlertProps } from './types';
/**
 * @deprecated Component has been deprecated and will be removed in next major version
 * Use "primitives/Alert" component instead
 */
declare const Alert: {
    ({ type, border, footer, closeIconTooltip, ...props }: AlertProps): React.JSX.Element;
    displayName: string;
};
export { Alert };
