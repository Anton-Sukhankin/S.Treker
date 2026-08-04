import { __rest } from 'tslib';
import React from 'react';
import { useTheme } from '@10d/tend-ui-theme';
import { useAllowClear } from '../../hooks/useAllowClear.js';
import { useSize } from '../../hooks/useSize.js';
import { Root } from './styled.js';

const Password = React.forwardRef((_a, ref) => {
    var { allowClear, clearIconTooltip } = _a, props = __rest(_a, ["allowClear", "clearIconTooltip"]);
    const theme = useTheme();
    const allowClearProp = useAllowClear({ allowClear, clearIconTooltip });
    const size = useSize(props.size);
    return (React.createElement(Root, Object.assign({ "data-testid": 'tend-ui-password' }, props, { ref: ref, "$theme": theme, allowClear: allowClearProp, size: size })));
});
Password.displayName = 'Password';

export { Password };
