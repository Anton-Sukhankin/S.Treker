import { __rest } from 'tslib';
import React from 'react';
import AntTextArea from 'antd-core/es/input/TextArea';
import { extractMarginProps } from '@10d/tend-ui-styling';
import { useTheme } from '@10d/tend-ui-theme';
import { useAllowClear } from '../../hooks/useAllowClear.js';
import { useSize } from '../../hooks/useSize.js';
import { useInputTitle } from '../../hooks/useInputTitle.js';
import { Container, ResizerIcon } from './styled.js';

const TextArea = React.forwardRef((_a, ref) => {
    var { className, fullWidth, autoSize = false, size = 'medium' } = _a, props = __rest(_a, ["className", "fullWidth", "autoSize", "size"]);
    const theme = useTheme();
    const allowClearProp = useAllowClear(props);
    const _size = useSize(size);
    const bind = useInputTitle(props);
    const textarea = React.useRef(null);
    React.useImperativeHandle(ref, () => textarea.current);
    const _b = extractMarginProps(props), { rest } = _b, margins = __rest(_b, ["rest"]);
    return (React.createElement(Container, Object.assign({ theme: theme, className: ['tend-ui-textarea-root', className].filter(Boolean).join(' '), "$fullWidth": fullWidth }, margins),
        React.createElement(AntTextArea, Object.assign({ "data-testid": 'tend-ui-textarea' }, rest, bind, { ref: textarea, autoSize: autoSize, allowClear: allowClearProp, size: _size })),
        !autoSize && React.createElement(ResizerIcon, { size: 12, color: 'gray500' })));
});
TextArea.displayName = 'TextArea';

export { TextArea };
