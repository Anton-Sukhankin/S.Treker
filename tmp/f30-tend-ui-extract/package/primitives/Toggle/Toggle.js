import { __rest } from 'tslib';
import React from 'react';
import AntSwitch from 'antd-core/es/switch';
import { Text } from '@10d/tend-ui-typography';
import { Container } from './styled.js';
import { Group } from './Group/Group.js';

const BaseToggle = React.forwardRef((_a, ref) => {
    var _b;
    var { children, className, style, UNSTABLE_styling } = _a, props = __rest(_a, ["children", "className", "style", "UNSTABLE_styling"]);
    return (React.createElement(Container, { className: className, style: style, "$disabled": props.disabled },
        React.createElement(AntSwitch, Object.assign({ "data-testid": 'tend-ui-toggle' }, props, { ref: ref })),
        React.createElement(Text, { disabled: props.disabled, strong: (_b = UNSTABLE_styling === null || UNSTABLE_styling === void 0 ? void 0 : UNSTABLE_styling.Text) === null || _b === void 0 ? void 0 : _b.strong }, children)));
});
const Toggle = Object.assign(BaseToggle, {
    displayName: 'Toggle',
    Group,
});

export { Toggle };
