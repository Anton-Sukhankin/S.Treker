import { __rest } from 'tslib';
import React from 'react';
import { useColor } from '@10d/tend-ui-theme';
import { Root } from './styled.js';

const Divider = (_a) => {
    var { margin, color } = _a, props = __rest(_a, ["margin", "color"]);
    // FIXME: Найти способ поправить литеральные типы
    const _color = useColor(color);
    return (React.createElement(Root, Object.assign({ "data-testid": 'tend-ui-divider' }, props, { "$margin": margin, "$color": _color })));
};
Divider.displayName = 'Divider';

export { Divider };
