import { __rest } from 'tslib';
import React from 'react';
import { Root, Img } from './styled.js';

const Image = (_a) => {
    var { width = '245px', height, rootClassName } = _a, props = __rest(_a, ["width", "height", "rootClassName"]);
    return (React.createElement(Root, { className: ['tend-ui-image-root', rootClassName].filter(Boolean).join(' '), "$width": width, "$height": height },
        React.createElement(Img, Object.assign({}, props, { className: ['tend-ui-image-img', props.className].filter(Boolean).join(' ') }))));
};

export { Image };
