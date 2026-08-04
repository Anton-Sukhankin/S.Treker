import { __rest } from 'tslib';
import React from 'react';
import { extractMarginProps, extractPaddingProps, extractLayoutProps } from '@10d/tend-ui-styling';
import { Root } from './styled.js';

const sizes = { small: '24px', medium: '32px', large: '40px' };
const Skeleton = (_a) => {
    var { skeleton = true, size = 'medium', children, display, height, borderRadius = '8px', 
    // FIXME: Использовать палитру дизайн системы
    backgroundColor = '#F0F0F0', className } = _a, props = __rest(_a, ["skeleton", "size", "children", "display", "height", "borderRadius", "backgroundColor", "className"]);
    const _b = extractMarginProps(props), { rest } = _b, margins = __rest(_b, ["rest"]);
    const _c = extractPaddingProps(rest), { rest: withoutPaddings } = _c, paddings = __rest(_c, ["rest"]);
    const layout = __rest(extractLayoutProps(withoutPaddings), []);
    const _height = height ? height : sizes[size];
    if (!skeleton)
        return React.createElement(React.Fragment, null, children);
    return (React.createElement(Root, Object.assign({}, layout, { "$display": display, "$mt": margins.$marginTop, "$mr": margins.$marginRight, "$mb": margins.$marginBottom, "$ml": margins.$marginLeft, "$pt": paddings.$paddingTop, "$pr": paddings.$paddingRight, "$pb": paddings.$paddingBottom, "$pl": paddings.$paddingLeft, "$backgroundColor": backgroundColor, "$borderRadius": borderRadius, "$height": _height, className: ['tend-ui-skeleton-root', className].filter(Boolean).join(' ') })));
};
Skeleton.displayName = 'Skeleton';

export { Skeleton };
