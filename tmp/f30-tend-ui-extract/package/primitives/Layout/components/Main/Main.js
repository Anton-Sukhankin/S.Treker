import { __rest } from 'tslib';
import React from 'react';
import { useTheme } from '@10d/tend-ui-theme';
import { Root } from './styled.js';
import { useSizeContext } from '../../contexts/SizeContext.js';
import { Title } from './components/Title/Title.js';

const Main = (_a) => {
    var { children, className, background = 'white' } = _a, props = __rest(_a, ["children", "className", "background"]);
    const theme = useTheme();
    const { size } = useSizeContext();
    return (React.createElement(Root, Object.assign({}, props, { theme: theme, "$size": size, "$background": background, className: ['tend-ui-layout-main', className].filter(Boolean).join(' ') }), children));
};
Main.Title = Title;
Main.displayName = 'Layout.Main';

export { Main };
