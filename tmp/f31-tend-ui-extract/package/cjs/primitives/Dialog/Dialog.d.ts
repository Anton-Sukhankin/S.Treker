import React from 'react';
import { DialogMethodConfirmProps, DialogMethodProps } from './types';
export declare const Dialog: {
    Styles: import("styled-components").GlobalStyleComponent<{}, import("styled-components").DefaultTheme>;
    useDialog: () => readonly [{
        info: ({ footer, closeIconTooltip, okButtonProps, cancelButtonProps, okText, cancelText, closable, content, okType, ...props }: DialogMethodProps) => {
            destroy: () => void;
            update: (configUpdate: import("antd-core/es/modal").ModalFuncProps | ((prevConfig: import("antd-core/es/modal").ModalFuncProps) => import("antd-core/es/modal").ModalFuncProps)) => void;
        };
        success: ({ footer, closeIconTooltip, okButtonProps, cancelButtonProps, okText, cancelText, closable, content, okType, ...props }: DialogMethodProps) => {
            destroy: () => void;
            update: (configUpdate: import("antd-core/es/modal").ModalFuncProps | ((prevConfig: import("antd-core/es/modal").ModalFuncProps) => import("antd-core/es/modal").ModalFuncProps)) => void;
        };
        warning: ({ footer, closeIconTooltip, okButtonProps, cancelButtonProps, okText, cancelText, closable, content, okType, ...props }: DialogMethodProps) => {
            destroy: () => void;
            update: (configUpdate: import("antd-core/es/modal").ModalFuncProps | ((prevConfig: import("antd-core/es/modal").ModalFuncProps) => import("antd-core/es/modal").ModalFuncProps)) => void;
        };
        error: ({ footer, closeIconTooltip, okButtonProps, cancelButtonProps, okText, cancelText, closable, content, okType, ...props }: DialogMethodProps) => {
            destroy: () => void;
            update: (configUpdate: import("antd-core/es/modal").ModalFuncProps | ((prevConfig: import("antd-core/es/modal").ModalFuncProps) => import("antd-core/es/modal").ModalFuncProps)) => void;
        };
        confirm: ({ footer, closeIconTooltip, okButtonProps, cancelButtonProps, okText, cancelText, image, closable, content, className, okType, ...props }: DialogMethodConfirmProps) => {
            destroy: () => void;
            update: (configUpdate: import("antd-core/es/modal").ModalFuncProps | ((prevConfig: import("antd-core/es/modal").ModalFuncProps) => import("antd-core/es/modal").ModalFuncProps)) => void;
        };
    }, React.ReactElement<any, string | React.JSXElementConstructor<any>>];
    destroyAll: () => void;
    config: typeof import("antd-core/es/modal/confirm").modalGlobalConfig;
} & {
    info: ({ footer, closeIconTooltip, okButtonProps, cancelButtonProps, okText, cancelText, closable, content, okType, ...props }: DialogMethodProps) => {
        destroy: () => void;
        update: (configUpdate: import("antd-core/es/modal").ModalFuncProps | ((prevConfig: import("antd-core/es/modal").ModalFuncProps) => import("antd-core/es/modal").ModalFuncProps)) => void;
    };
    success: ({ footer, closeIconTooltip, okButtonProps, cancelButtonProps, okText, cancelText, closable, content, okType, ...props }: DialogMethodProps) => {
        destroy: () => void;
        update: (configUpdate: import("antd-core/es/modal").ModalFuncProps | ((prevConfig: import("antd-core/es/modal").ModalFuncProps) => import("antd-core/es/modal").ModalFuncProps)) => void;
    };
    warning: ({ footer, closeIconTooltip, okButtonProps, cancelButtonProps, okText, cancelText, closable, content, okType, ...props }: DialogMethodProps) => {
        destroy: () => void;
        update: (configUpdate: import("antd-core/es/modal").ModalFuncProps | ((prevConfig: import("antd-core/es/modal").ModalFuncProps) => import("antd-core/es/modal").ModalFuncProps)) => void;
    };
    error: ({ footer, closeIconTooltip, okButtonProps, cancelButtonProps, okText, cancelText, closable, content, okType, ...props }: DialogMethodProps) => {
        destroy: () => void;
        update: (configUpdate: import("antd-core/es/modal").ModalFuncProps | ((prevConfig: import("antd-core/es/modal").ModalFuncProps) => import("antd-core/es/modal").ModalFuncProps)) => void;
    };
    confirm: ({ footer, closeIconTooltip, okButtonProps, cancelButtonProps, okText, cancelText, image, closable, content, className, okType, ...props }: DialogMethodConfirmProps) => {
        destroy: () => void;
        update: (configUpdate: import("antd-core/es/modal").ModalFuncProps | ((prevConfig: import("antd-core/es/modal").ModalFuncProps) => import("antd-core/es/modal").ModalFuncProps)) => void;
    };
};
