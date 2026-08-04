import { __rest } from 'tslib';
import React from 'react';
import { extractMarginProps } from '@10d/tend-ui-styling';
import { useColor } from '@10d/tend-ui-theme';
import { Root } from './styled.js';

const levelMap = {
    h1: 1,
    h2: 2,
    h3: 3,
    h4: 4,
    h5: 5,
    d1: 1,
    d2: 1,
};
const Title = React.forwardRef((_a, ref) => {
    var { level = 'h1', uppercase, color, textAlign } = _a, props = __rest(_a, ["level", "uppercase", "color", "textAlign"]);
    const _color = useColor(color);
    const _b = extractMarginProps(props), { rest } = _b, marginProps = __rest(_b, ["rest"]);
    return (React.createElement(Root, Object.assign({ "data-testid": 'tend-ui-title' }, rest, marginProps, { ref: ref, "$level": level, "$uppercase": uppercase, "$color": _color, "$textAlign": textAlign, level: levelMap[level] })));
});
Title.displayName = 'Title';

export { Title };
