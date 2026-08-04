import { __rest } from 'tslib';
import React from 'react';
import AntCard from 'antd-core/es/card';
import Grid from 'antd-core/es/card/Grid';
import Meta from 'antd-core/es/card/Meta';

const Card = Object.assign(React.forwardRef((_a, ref) => {
    var { bordered = false } = _a, props = __rest(_a, ["bordered"]);
    return (React.createElement(AntCard, Object.assign({ "data-testid": 'tend-ui-card' }, props, { ref: ref, bordered: bordered })));
}), {
    displayName: 'Card',
    Grid,
    Meta,
});
Card.displayName = 'Card';

export { Card };
