import { __rest } from 'tslib';
import React from 'react';
import { extractMarginProps, extractPaddingProps } from '@10d/tend-ui-styling';
import { useTheme } from '@10d/tend-ui-theme';
import { useScroll } from '../../hooks/useScroll.js';
import { useSizeContext } from '../../contexts/SizeContext.js';
import { Root } from './styled.js';

const Header = (_a) => {
    var { children, sticky = false, className } = _a, props = __rest(_a, ["children", "sticky", "className"]);
    const theme = useTheme();
    const { size } = useSizeContext();
    const ref = React.useRef(null);
    const { register } = useScroll();
    register('header', ref);
    const _b = extractMarginProps(props), { rest: withoutMargins } = _b, margins = __rest(_b, ["rest"]);
    const _c = extractPaddingProps(withoutMargins), { rest } = _c, paddings = __rest(_c, ["rest"]);
    return (React.createElement(Root, Object.assign({}, rest, margins, paddings, { ref: ref, className: ['tend-ui-layout-header', className].filter(Boolean).join(' '), theme: theme, "$sticky": sticky, "$size": size }), children));
};
Header.displayName = 'Layout.Header';

export { Header };
