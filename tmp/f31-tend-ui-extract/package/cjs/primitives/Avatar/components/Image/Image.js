'use strict';

var tslib = require('tslib');
var React = require('react');
var tendUiHooks = require('@10d/tend-ui-hooks');
var styled = require('./styled.js');
var useImageLoadingStatus = require('../../hooks/useImageLoadingStatus.js');
var AvatarContext = require('../../contexts/AvatarContext.js');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

const Image = React__default["default"].forwardRef((_a, ref) => {
    var { children, src, className, fit = 'cover' } = _a, props = tslib.__rest(_a, ["children", "src", "className", "fit"]);
    const _src = Array.isArray(src) ? undefined : src;
    const imageLoadingStatus = useImageLoadingStatus.useImageLoadingStatus(_src);
    const context = AvatarContext.useAvatarContext();
    const isSuccess = context.imageLoadingStatus === 'success';
    const onLoadingStatusChange = tendUiHooks.useCallbackRef((status) => {
        context.onImageLoadingStatusChange(status);
    });
    React__default["default"].useLayoutEffect(() => {
        if (imageLoadingStatus === 'idle')
            return;
        onLoadingStatusChange(imageLoadingStatus);
    }, [imageLoadingStatus, onLoadingStatusChange]);
    if (!isSuccess)
        return null;
    return (React__default["default"].createElement(styled.Root, Object.assign({ "data-testid": 'tend-ui-avatar-image' }, props, { ref: ref, "$objectFit": fit, src: _src, className: ['tend-ui-avatar-image', className].filter(Boolean).join(' ') }), children));
});
Image.displayName = 'Avatar.Image';

exports.Image = Image;
