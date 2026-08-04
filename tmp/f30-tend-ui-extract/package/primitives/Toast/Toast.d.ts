import React from 'react';
import { GlobalConfigProps, NotificationConfig } from 'antd-core/es/notification/interface';
import { ToastConfig } from './types';
export declare const Toast: {
    Styles: import("styled-components").GlobalStyleComponent<{}, import("styled-components").DefaultTheme>;
    useToast: (config?: NotificationConfig) => readonly [{
        init: () => void;
        success: (config: ToastConfig) => void;
        error: (config: ToastConfig) => void;
        warning: (config: ToastConfig) => void;
        info: (config: ToastConfig) => void;
        neutral: (config: ToastConfig) => void;
        loading: (config: ToastConfig) => void;
        open: (args: import("antd-core/es/notification").ArgsProps) => void;
        destroy(key?: React.Key): void;
    }, React.ReactElement<any, string | React.JSXElementConstructor<any>>];
    config: (config: GlobalConfigProps) => void;
    destroy: (key?: React.Key) => void;
} & {
    init: () => void;
    success: (config: ToastConfig) => void;
    error: (config: ToastConfig) => void;
    warning: (config: ToastConfig) => void;
    info: (config: ToastConfig) => void;
    neutral: (config: ToastConfig) => void;
    loading: (config: ToastConfig) => void;
};
