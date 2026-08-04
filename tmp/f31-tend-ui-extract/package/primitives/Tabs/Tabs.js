import { __rest } from 'tslib';
import React from 'react';
import { useTheme } from '@10d/tend-ui-theme';
import { useSize } from '../../hooks/useSize.js';
import { More } from './More.js';
import { Root } from './styled.js';

const Tabs = React.forwardRef((_a, ref) => {
    var { moreText } = _a, props = __rest(_a, ["moreText"]);
    const theme = useTheme();
    const hasMoreIcon = typeof props.moreIcon !== 'undefined';
    const size = useSize(props.size);
    return (React.createElement(Root, Object.assign({ "data-testid": 'tend-ui-tabs', moreIcon: React.createElement(More, null, moreText) }, props, { ref: ref, "$customMoreIcon": hasMoreIcon, "$theme": theme, size: size })));
});
Tabs.displayName = 'Tabs';

export { Tabs };
