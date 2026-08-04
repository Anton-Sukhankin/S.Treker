import React from 'react';
/**
 * @description HOC passes a React "className" property to a given property name
 * in order to style off-DOM-rendered elements with "styled-components"
 */
export declare const withInjectedClassName: <P extends {
    className?: string;
}, R = React.ElementRef<React.ComponentType<P>>>(Component: React.ComponentType<P>, propertyName: keyof P) => React.ForwardRefExoticComponent<React.PropsWithoutRef<P> & React.RefAttributes<R>>;
