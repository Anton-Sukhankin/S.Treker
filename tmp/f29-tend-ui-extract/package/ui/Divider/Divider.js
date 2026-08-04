import React from 'react';
import { useTheme, useColor } from '@10d/tend-ui-theme';
import { Root } from './styled.js';

const Divider = ({ variant = 'horizontal', margin, padding, height, color, }) => {
    const theme = useTheme();
    // FIXME: Найти способ поправить литеральные типы
    const _color = useColor(color);
    const isVertical = variant === 'vertical';
    const as = isVertical ? 'div' : 'hr';
    return (React.createElement(Root, { theme: theme, as: as, "$type": variant, "$margin": margin, "$padding": padding, "$height": height, "$color": _color }));
};

export { Divider };
