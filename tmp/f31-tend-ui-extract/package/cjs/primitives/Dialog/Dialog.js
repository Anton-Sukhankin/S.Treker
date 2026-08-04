'use strict';

var tslib = require('tslib');
var React = require('react');
var AntModal = require('antd-core/es/modal');
var Info = require('@10d/tend-ui-icons/Info');
var Error = require('@10d/tend-ui-icons/Error');
var DoneCircle = require('@10d/tend-ui-icons/DoneCircle');
var Cancel = require('@10d/tend-ui-icons/Cancel');
var Footer = require('./components/Footer/Footer.js');
var CloseIcon = require('./components/CloseIcon/CloseIcon.js');
var styled = require('./styled.js');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);
var AntModal__default = /*#__PURE__*/_interopDefault(AntModal);

const methodsFactory = (modal) => {
    return {
        info: (_a) => {
            var { footer, closeIconTooltip, okButtonProps, cancelButtonProps, okText = 'Принять', cancelText = 'Отмена', closable = true, content, okType = 'primary' } = _a, props = tslib.__rest(_a, ["footer", "closeIconTooltip", "okButtonProps", "cancelButtonProps", "okText", "cancelText", "closable", "content", "okType"]);
            const instance = modal.info(Object.assign(Object.assign({ icon: React__default["default"].createElement(Info.Info, { padding: 4 }), width: 480 }, props), { content: (React__default["default"].createElement(styled.Box, { "$display": 'flex', "$flexDirection": 'column', "$gap": 8 }, content)), footer: (React__default["default"].createElement(Footer.Footer, { footer: footer, okButtonProps: Object.assign({ variant: okType }, okButtonProps), cancelButtonProps: cancelButtonProps, okText: okText, cancelText: cancelText, onOk: props.onOk, onCancel: props.onCancel, destroy: () => {
                        instance.destroy();
                    } })), closeIcon: React__default["default"].createElement(CloseIcon.CloseIcon, Object.assign({}, closeIconTooltip)), closable }));
            return instance;
        },
        success: (_a) => {
            var { footer, closeIconTooltip, okButtonProps, cancelButtonProps, okText = 'Принять', cancelText = 'Отмена', closable = true, content, okType = 'primary' } = _a, props = tslib.__rest(_a, ["footer", "closeIconTooltip", "okButtonProps", "cancelButtonProps", "okText", "cancelText", "closable", "content", "okType"]);
            const instance = modal.success(Object.assign(Object.assign({ icon: React__default["default"].createElement(DoneCircle.DoneCircle, { padding: 4 }), width: 480 }, props), { content: (React__default["default"].createElement(styled.Box, { "$display": 'flex', "$flexDirection": 'column', "$gap": 8 }, content)), footer: (React__default["default"].createElement(Footer.Footer, { footer: footer, okButtonProps: Object.assign({ variant: okType }, okButtonProps), cancelButtonProps: cancelButtonProps, okText: okText, cancelText: cancelText, onOk: props.onOk, onCancel: props.onCancel, destroy: () => {
                        instance.destroy();
                    } })), closeIcon: React__default["default"].createElement(CloseIcon.CloseIcon, Object.assign({}, closeIconTooltip)), closable }));
            return instance;
        },
        warning: (_a) => {
            var { footer, closeIconTooltip, okButtonProps, cancelButtonProps, okText = 'Принять', cancelText = 'Отмена', closable = true, content, okType = 'primary' } = _a, props = tslib.__rest(_a, ["footer", "closeIconTooltip", "okButtonProps", "cancelButtonProps", "okText", "cancelText", "closable", "content", "okType"]);
            const instance = modal.warning(Object.assign(Object.assign({ icon: React__default["default"].createElement(Error.Error, { padding: 4 }), width: 480 }, props), { content: (React__default["default"].createElement(styled.Box, { "$display": 'flex', "$flexDirection": 'column', "$gap": 8 }, content)), footer: (React__default["default"].createElement(Footer.Footer, { footer: footer, okButtonProps: Object.assign({ variant: okType }, okButtonProps), cancelButtonProps: cancelButtonProps, okText: okText, cancelText: cancelText, onOk: props.onOk, onCancel: props.onCancel, destroy: () => {
                        instance.destroy();
                    } })), closeIcon: React__default["default"].createElement(CloseIcon.CloseIcon, Object.assign({}, closeIconTooltip)), closable }));
            return instance;
        },
        error: (_a) => {
            var { footer, closeIconTooltip, okButtonProps, cancelButtonProps, okText = 'Принять', cancelText = 'Отмена', closable = true, content, okType = 'primary' } = _a, props = tslib.__rest(_a, ["footer", "closeIconTooltip", "okButtonProps", "cancelButtonProps", "okText", "cancelText", "closable", "content", "okType"]);
            const instance = modal.error(Object.assign(Object.assign({ icon: React__default["default"].createElement(Cancel.Cancel, { padding: 4 }), width: 480 }, props), { content: (React__default["default"].createElement(styled.Box, { "$display": 'flex', "$flexDirection": 'column', "$gap": 8 }, content)), footer: (React__default["default"].createElement(Footer.Footer, { footer: footer, okButtonProps: Object.assign({ variant: okType }, okButtonProps), cancelButtonProps: Object.assign({ danger: true }, cancelButtonProps), okText: okText, cancelText: cancelText, onOk: props.onOk, onCancel: props.onCancel, destroy: () => {
                        instance.destroy();
                    } })), closeIcon: React__default["default"].createElement(CloseIcon.CloseIcon, Object.assign({}, closeIconTooltip)), closable }));
            return instance;
        },
        confirm: (_a) => {
            var { footer, closeIconTooltip, okButtonProps, cancelButtonProps, okText = 'Принять', cancelText = 'Отмена', image = { layout: 'contain' }, closable = true, content, className, okType = 'primary' } = _a, props = tslib.__rest(_a, ["footer", "closeIconTooltip", "okButtonProps", "cancelButtonProps", "okText", "cancelText", "image", "closable", "content", "className", "okType"]);
            const hasImage = !!image.src;
            const imageDefaultLayout = image.layout || 'contain';
            const isCoverLayout = imageDefaultLayout === 'cover';
            const classNames = [className];
            if (hasImage)
                classNames.push('tend-ui-modal-confirm-image');
            if (isCoverLayout)
                classNames.push('tend-ui-modal-confirm-image-cover');
            const instance = modal.confirm(Object.assign(Object.assign({ width: 480 }, props), { closable, className: classNames.filter(Boolean).join(' '), content: (React__default["default"].createElement(styled.Box, { "$display": 'flex', "$flexDirection": 'column', "$gap": 8 }, content)), footer: (React__default["default"].createElement(Footer.Footer, { padding: isCoverLayout ? '0 32px 24px' : undefined, footer: footer, okButtonProps: Object.assign({ variant: okType }, okButtonProps), cancelButtonProps: cancelButtonProps, okText: okText, cancelText: cancelText, onOk: props.onOk, onCancel: props.onCancel, destroy: () => {
                        instance.destroy();
                    } })), closeIcon: React__default["default"].createElement(CloseIcon.CloseIcon, Object.assign({}, closeIconTooltip)), icon: hasImage ? (React__default["default"].createElement(styled.ImageContainer, { "$layout": imageDefaultLayout },
                    React__default["default"].createElement(styled.Img, { src: image.src }))) : null }));
            return instance;
        },
    };
};
const Dialog = Object.assign({
    Styles: styled.Styles,
    useDialog: () => {
        const [methods, holder] = AntModal__default["default"].useModal();
        return [methodsFactory(methods), holder];
    },
    destroyAll: AntModal__default["default"].destroyAll,
    config: AntModal__default["default"].config,
}, methodsFactory(AntModal__default["default"]));

exports.Dialog = Dialog;
