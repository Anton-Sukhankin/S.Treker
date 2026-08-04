import { __rest } from 'tslib';
import React from 'react';
import { useAvatarContext } from '../../contexts/AvatarContext.js';
import { Root } from './styled.js';

const Fallback = React.forwardRef((_a, ref) => {
    var { className } = _a, props = __rest(_a, ["className"]);
    const context = useAvatarContext();
    const isSuccess = context.imageLoadingStatus === 'success';
    if (isSuccess)
        return null;
    return (React.createElement(Root, Object.assign({ "data-testid": 'tend-ui-avatar-fallback' }, props, { ref: ref, className: ['tend-ui-avatar-fallback', className].filter(Boolean).join(' ') })));
});
Fallback.displayName = 'Avatar.Fallback';

export { Fallback };
