import React from 'react';
type Position = 'initial' | 'top' | 'middle' | 'bottom';
declare const ScrollPosition: ({ children, onScrollPositionChange, }: React.PropsWithChildren<{
    onScrollPositionChange?: (position: Position) => void;
}>) => React.JSX.Element;
export { ScrollPosition };
