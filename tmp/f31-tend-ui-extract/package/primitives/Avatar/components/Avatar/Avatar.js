import { __rest } from 'tslib';
import React from 'react';
import { isUndefined } from '@10d/tend-ui-utils';
import { Badge } from '../../../Badge/Badge.js';
import { Image } from '../Image/Image.js';
import { Fallback } from '../Fallback/Fallback.js';
import { Root } from '../Root/Root.js';
import { Unknown } from '../../Unknown.js';
import { UnknownGroup } from '../../UnknownGroup.js';

const presets = {
    online: 'green',
    offline: 'gray',
    away: 'yellow',
    busy: 'red',
};
const BaseAvatar = (_a, ref) => {
    var { size = 'medium', fit, children, status, src, pointer = false, bordered = false, UNSTABLE_styling } = _a, props = __rest(_a, ["size", "fit", "children", "status", "src", "pointer", "bordered", "UNSTABLE_styling"]);
    const _src = Array.isArray(src) ? undefined : src;
    const fallbackNode = React.useMemo(() => {
        if (Array.isArray(src))
            return React.createElement(UnknownGroup, { size: size });
        return React.createElement(Unknown, { size: size });
    }, [src, size]);
    const badgeProps = React.useMemo(() => {
        if (typeof status === 'object')
            return status;
        const preset = presets[status || 'online'];
        return {
            preset,
            offset: [0, 0],
            placement: 'rightBottom',
        };
    }, [status]);
    const content = React.useMemo(() => {
        if (isUndefined(children))
            return (React.createElement(React.Fragment, null,
                React.createElement(Image, Object.assign({}, props, { src: _src, fit: fit })),
                React.createElement(Fallback, Object.assign({}, props), fallbackNode)));
        return React.createElement(Fallback, Object.assign({}, props), children);
    }, [_src, children, fallbackNode, fit, props]);
    const child = (React.createElement(Root, { ref: ref, size: size, pointer: pointer, bordered: bordered, UNSTABLE_styling: UNSTABLE_styling }, content));
    return status ? React.createElement(Badge, Object.assign({}, badgeProps), child) : child;
};
const Avatar = React.forwardRef(BaseAvatar);
Avatar.displayName = 'Avatar';

export { Avatar };
