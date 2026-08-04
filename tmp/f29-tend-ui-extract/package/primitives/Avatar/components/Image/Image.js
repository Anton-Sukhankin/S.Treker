import { __rest } from 'tslib';
import React from 'react';
import { useCallbackRef } from '@10d/tend-ui-hooks';
import { Root } from './styled.js';
import { useImageLoadingStatus } from '../../hooks/useImageLoadingStatus.js';
import { useAvatarContext } from '../../contexts/AvatarContext.js';

const Image = React.forwardRef((_a, ref) => {
    var { children, src, className, fit = 'cover' } = _a, props = __rest(_a, ["children", "src", "className", "fit"]);
    const _src = Array.isArray(src) ? undefined : src;
    const imageLoadingStatus = useImageLoadingStatus(_src);
    const context = useAvatarContext();
    const isSuccess = context.imageLoadingStatus === 'success';
    const onLoadingStatusChange = useCallbackRef((status) => {
        context.onImageLoadingStatusChange(status);
    });
    React.useLayoutEffect(() => {
        if (imageLoadingStatus === 'idle')
            return;
        onLoadingStatusChange(imageLoadingStatus);
    }, [imageLoadingStatus, onLoadingStatusChange]);
    if (!isSuccess)
        return null;
    return (React.createElement(Root, Object.assign({ "data-testid": 'tend-ui-avatar-image' }, props, { ref: ref, "$objectFit": fit, src: _src, className: ['tend-ui-avatar-image', className].filter(Boolean).join(' ') }), children));
});
Image.displayName = 'Avatar.Image';

export { Image };
