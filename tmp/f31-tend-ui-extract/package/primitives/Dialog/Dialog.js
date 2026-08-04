import { __rest } from 'tslib';
import React from 'react';
import AntModal from 'antd-core/es/modal';
import { Info } from '@10d/tend-ui-icons/Info';
import { Error } from '@10d/tend-ui-icons/Error';
import { DoneCircle } from '@10d/tend-ui-icons/DoneCircle';
import { Cancel } from '@10d/tend-ui-icons/Cancel';
import { Footer } from './components/Footer/Footer.js';
import { CloseIcon } from './components/CloseIcon/CloseIcon.js';
import { Styles, ImageContainer, Img, Box } from './styled.js';

const methodsFactory = (modal) => {
    return {
        info: (_a) => {
            var { footer, closeIconTooltip, okButtonProps, cancelButtonProps, okText = 'Принять', cancelText = 'Отмена', closable = true, content, okType = 'primary' } = _a, props = __rest(_a, ["footer", "closeIconTooltip", "okButtonProps", "cancelButtonProps", "okText", "cancelText", "closable", "content", "okType"]);
            const instance = modal.info(Object.assign(Object.assign({ icon: React.createElement(Info, { padding: 4 }), width: 480 }, props), { content: (React.createElement(Box, { "$display": 'flex', "$flexDirection": 'column', "$gap": 8 }, content)), footer: (React.createElement(Footer, { footer: footer, okButtonProps: Object.assign({ variant: okType }, okButtonProps), cancelButtonProps: cancelButtonProps, okText: okText, cancelText: cancelText, onOk: props.onOk, onCancel: props.onCancel, destroy: () => {
                        instance.destroy();
                    } })), closeIcon: React.createElement(CloseIcon, Object.assign({}, closeIconTooltip)), closable }));
            return instance;
        },
        success: (_a) => {
            var { footer, closeIconTooltip, okButtonProps, cancelButtonProps, okText = 'Принять', cancelText = 'Отмена', closable = true, content, okType = 'primary' } = _a, props = __rest(_a, ["footer", "closeIconTooltip", "okButtonProps", "cancelButtonProps", "okText", "cancelText", "closable", "content", "okType"]);
            const instance = modal.success(Object.assign(Object.assign({ icon: React.createElement(DoneCircle, { padding: 4 }), width: 480 }, props), { content: (React.createElement(Box, { "$display": 'flex', "$flexDirection": 'column', "$gap": 8 }, content)), footer: (React.createElement(Footer, { footer: footer, okButtonProps: Object.assign({ variant: okType }, okButtonProps), cancelButtonProps: cancelButtonProps, okText: okText, cancelText: cancelText, onOk: props.onOk, onCancel: props.onCancel, destroy: () => {
                        instance.destroy();
                    } })), closeIcon: React.createElement(CloseIcon, Object.assign({}, closeIconTooltip)), closable }));
            return instance;
        },
        warning: (_a) => {
            var { footer, closeIconTooltip, okButtonProps, cancelButtonProps, okText = 'Принять', cancelText = 'Отмена', closable = true, content, okType = 'primary' } = _a, props = __rest(_a, ["footer", "closeIconTooltip", "okButtonProps", "cancelButtonProps", "okText", "cancelText", "closable", "content", "okType"]);
            const instance = modal.warning(Object.assign(Object.assign({ icon: React.createElement(Error, { padding: 4 }), width: 480 }, props), { content: (React.createElement(Box, { "$display": 'flex', "$flexDirection": 'column', "$gap": 8 }, content)), footer: (React.createElement(Footer, { footer: footer, okButtonProps: Object.assign({ variant: okType }, okButtonProps), cancelButtonProps: cancelButtonProps, okText: okText, cancelText: cancelText, onOk: props.onOk, onCancel: props.onCancel, destroy: () => {
                        instance.destroy();
                    } })), closeIcon: React.createElement(CloseIcon, Object.assign({}, closeIconTooltip)), closable }));
            return instance;
        },
        error: (_a) => {
            var { footer, closeIconTooltip, okButtonProps, cancelButtonProps, okText = 'Принять', cancelText = 'Отмена', closable = true, content, okType = 'primary' } = _a, props = __rest(_a, ["footer", "closeIconTooltip", "okButtonProps", "cancelButtonProps", "okText", "cancelText", "closable", "content", "okType"]);
            const instance = modal.error(Object.assign(Object.assign({ icon: React.createElement(Cancel, { padding: 4 }), width: 480 }, props), { content: (React.createElement(Box, { "$display": 'flex', "$flexDirection": 'column', "$gap": 8 }, content)), footer: (React.createElement(Footer, { footer: footer, okButtonProps: Object.assign({ variant: okType }, okButtonProps), cancelButtonProps: Object.assign({ danger: true }, cancelButtonProps), okText: okText, cancelText: cancelText, onOk: props.onOk, onCancel: props.onCancel, destroy: () => {
                        instance.destroy();
                    } })), closeIcon: React.createElement(CloseIcon, Object.assign({}, closeIconTooltip)), closable }));
            return instance;
        },
        confirm: (_a) => {
            var { footer, closeIconTooltip, okButtonProps, cancelButtonProps, okText = 'Принять', cancelText = 'Отмена', image = { layout: 'contain' }, closable = true, content, className, okType = 'primary' } = _a, props = __rest(_a, ["footer", "closeIconTooltip", "okButtonProps", "cancelButtonProps", "okText", "cancelText", "image", "closable", "content", "className", "okType"]);
            const hasImage = !!image.src;
            const imageDefaultLayout = image.layout || 'contain';
            const isCoverLayout = imageDefaultLayout === 'cover';
            const classNames = [className];
            if (hasImage)
                classNames.push('tend-ui-modal-confirm-image');
            if (isCoverLayout)
                classNames.push('tend-ui-modal-confirm-image-cover');
            const instance = modal.confirm(Object.assign(Object.assign({ width: 480 }, props), { closable, className: classNames.filter(Boolean).join(' '), content: (React.createElement(Box, { "$display": 'flex', "$flexDirection": 'column', "$gap": 8 }, content)), footer: (React.createElement(Footer, { padding: isCoverLayout ? '0 32px 24px' : undefined, footer: footer, okButtonProps: Object.assign({ variant: okType }, okButtonProps), cancelButtonProps: cancelButtonProps, okText: okText, cancelText: cancelText, onOk: props.onOk, onCancel: props.onCancel, destroy: () => {
                        instance.destroy();
                    } })), closeIcon: React.createElement(CloseIcon, Object.assign({}, closeIconTooltip)), icon: hasImage ? (React.createElement(ImageContainer, { "$layout": imageDefaultLayout },
                    React.createElement(Img, { src: image.src }))) : null }));
            return instance;
        },
    };
};
const Dialog = Object.assign({
    Styles,
    useDialog: () => {
        const [methods, holder] = AntModal.useModal();
        return [methodsFactory(methods), holder];
    },
    destroyAll: AntModal.destroyAll,
    config: AntModal.config,
}, methodsFactory(AntModal));

export { Dialog };
