import { __rest } from 'tslib';
import React from 'react';
import { INTERNAL_TendUILogger, isNumber } from '@10d/tend-ui-utils';
import { useTheme } from '@10d/tend-ui-theme';
import { Bubble, Root, Content } from './styled.js';

const BaseBadge = (_a, ref) => {
    var { showZero = false, preset = 'red', before, after, children, inner, max = 99, offset = [8, -10], padding, placement, className, rootClassName, variant } = _a, props = __rest(_a, ["showZero", "preset", "before", "after", "children", "inner", "max", "offset", "padding", "placement", "className", "rootClassName", "variant"]);
    if (process.env.NODE_ENV === 'development') {
        INTERNAL_TendUILogger.warning([
            '<Badge /> из пакета "@10d/tend-ui" устарел и больше не поддерживается.',
            '',
            'Используйте <Counter />, <Dot /> и <Tag /> соответственно из пакета "@10d/tend-ui-primitives"',
        ]);
    }
    const theme = useTheme();
    const hasChildren = typeof children !== 'undefined';
    const hasInner = typeof inner !== 'undefined';
    const isStatus = !hasChildren && !hasInner;
    const isDot = hasChildren && !hasInner;
    const isCounter = hasChildren && hasInner;
    const shape = (() => {
        if (variant)
            return variant;
        if (isStatus)
            return 'status';
        if (isDot)
            return 'dot';
        if (isCounter)
            return 'counter';
        return 'bubble';
    })();
    const content = (() => {
        // as a counter
        if (isNumber(inner)) {
            if (showZero) {
                if (inner >= max)
                    return `${max}+`;
                return inner;
            }
            if (inner <= 0)
                return null;
            if (inner >= max)
                return `${max}+`;
        }
        // custom content
        return inner;
    })();
    const isCounterVariant = shape === 'counter';
    const _content = React.useMemo(() => (React.createElement(Bubble, Object.assign({ "data-testid": 'tend-ui-badge' }, props, { theme: theme, "$shape": shape, "$preset": preset, "$offset": offset, "$padding": padding, "$placement": placement, "$pointer": !!props.onClick, title: isNumber(inner) ? `${inner}` : undefined, className: ['tend-ui-badge-badge', className].filter(Boolean).join(' ') }), content)), [className, content, inner, offset, padding, placement, preset, props, shape, theme]);
    return (React.createElement(Root, { ref: ref, theme: theme, className: ['tend-ui-badge-root', rootClassName].filter(Boolean).join(' ') },
        before && React.createElement(Content, { theme: theme }, before),
        children,
        isCounterVariant ? (!!content || isNumber(content)) && _content : _content,
        after && React.createElement(Content, { theme: theme }, after)));
};
/**
 * @deprecated Устарело. Используйте `primitives/Counter`, `ui/Dot` и `primitives/Tag` соответственно
 */
const Badge = React.forwardRef(BaseBadge);
Badge.displayName = 'Badge';

export { Badge };
