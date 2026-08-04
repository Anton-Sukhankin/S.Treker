import React from 'react';
import { DrawerProps } from './types';
/**
 * @deprecated Компонент устарел. Используйте `Drawer` из пакета `@10d/tend-ui-primitives`
 */
declare const Drawer: {
    ({ fullscreen, above, before, title, description, size, placement, okButtonProps, onOk, okText, cancelButtonProps, onCancel, cancelText, footer, closeIcon, children, width, height, styles, ...props }: DrawerProps): React.JSX.Element;
    displayName: string;
};
export { Drawer };
