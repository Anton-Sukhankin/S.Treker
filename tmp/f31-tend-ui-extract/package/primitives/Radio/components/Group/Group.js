import { __rest } from 'tslib';
import React from 'react';
import { useTheme } from '@10d/tend-ui-theme';
import { Root } from './styled.js';

const BaseGroup = (_a, ref) => {
    var { layout = 'horizontal', fullWidth = false } = _a, props = __rest(_a, ["layout", "fullWidth"]);
    const theme = useTheme();
    return (React.createElement(Root, Object.assign({}, props, { ref: ref, "$theme": theme, "$layout": layout, "$fullWidth": fullWidth })));
};
const Group = React.forwardRef(BaseGroup);
Group.displayName = 'Radio.Group';

export { Group };
