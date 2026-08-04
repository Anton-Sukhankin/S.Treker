import { __rest } from 'tslib';
import React from 'react';
import AntForm from 'antd-core/es/form';
import { Help } from '@10d/tend-ui-icons/Help';
import { useTheme } from '@10d/tend-ui-theme';
import { Root } from './styled.js';
import { useErrorMessagePrefix } from './hooks.js';

const Item = (_a) => {
    var { children, width } = _a, props = __rest(_a, ["children", "width"]);
    const theme = useTheme();
    const rules = useErrorMessagePrefix(props.rules);
    const tooltip = React.useMemo(() => {
        if (!props.tooltip)
            return;
        const icon = typeof props.tooltip.children === 'undefined' ? (React.createElement(Help, { "data-testid": 'help-icon' })) : (props.tooltip.children);
        const overlayInnerStyle = props.tooltip.lineBreak
            ? Object.assign(Object.assign({}, props.tooltip.overlayInnerStyle), { whiteSpace: 'pre-line' }) : undefined;
        return Object.assign(Object.assign({ icon }, props.tooltip), { overlayInnerStyle });
    }, [props.tooltip]);
    return (React.createElement(Root, Object.assign({}, props, { "$theme": theme, "$width": width, rules: rules, tooltip: tooltip }), children));
};
Item.displayName = 'Form.Item';
Item.useStatus = AntForm.Item.useStatus;

export { Item };
