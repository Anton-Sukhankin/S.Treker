import { __rest } from 'tslib';
import React from 'react';
import { useSize } from '../../hooks/useSize.js';
import { useTheme } from '@10d/tend-ui-theme';
import { Root } from './styled.js';

const TimePicker = React.forwardRef((_a, ref) => {
    var { fullWidth, width } = _a, props = __rest(_a, ["fullWidth", "width"]);
    const theme = useTheme();
    const size = useSize(props.size);
    return (React.createElement(Root, Object.assign({ "data-testid": 'tend-ui-time-picker' }, props, { ref: ref, "$theme": theme, "$fullWidth": fullWidth, "$width": width, size: size })));
});
TimePicker.displayName = 'TimePicker';

export { TimePicker };
