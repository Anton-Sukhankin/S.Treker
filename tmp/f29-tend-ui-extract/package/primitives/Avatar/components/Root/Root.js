import { __rest } from 'tslib';
import React from 'react';
import { useTheme, useColor } from '@10d/tend-ui-theme';
import { Root as Root$1 } from './styled.js';
import { AvatarContext } from '../../contexts/AvatarContext.js';

const Root = React.forwardRef((_a, ref) => {
    var { children, size = 'medium', className, pointer, bordered, UNSTABLE_styling } = _a, props = __rest(_a, ["children", "size", "className", "pointer", "bordered", "UNSTABLE_styling"]);
    const theme = useTheme();
    const [imageLoadingStatus, setImageLoadingStatus] = React.useState('idle');
    const isSuccess = imageLoadingStatus === 'success';
    const backgroundColor = isSuccess ? 'transparent' : theme.colors.blue100;
    // FIXME: Исправить литеральные типы
    const _borderColor = useColor(UNSTABLE_styling === null || UNSTABLE_styling === void 0 ? void 0 : UNSTABLE_styling.borderColor, theme.colors.blue100);
    return (React.createElement(AvatarContext, { value: React.useMemo(() => ({
            imageLoadingStatus,
            onImageLoadingStatusChange: setImageLoadingStatus,
        }), [imageLoadingStatus]) },
        React.createElement(Root$1, Object.assign({ "data-testid": 'tend-ui-avatar-root' }, props, { ref: ref, theme: theme, "$size": size, "$pointer": pointer, "$backgroundColor": backgroundColor, "$bordered": bordered, "$borderColor": _borderColor, className: ['tend-ui-avatar-root', className].filter(Boolean).join(' ') }), children)));
});
Root.displayName = 'Avatar.Root';

export { Root };
