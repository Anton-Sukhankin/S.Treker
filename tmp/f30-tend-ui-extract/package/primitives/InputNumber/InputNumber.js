import { __rest } from 'tslib';
import React from 'react';
import { useTheme } from '@10d/tend-ui-theme';
import { useSize } from '../../hooks/useSize.js';
import { Root } from './styled.js';

const BaseInputNumber = (_a, ref) => {
    var { fullWidth } = _a, props = __rest(_a, ["fullWidth"]);
    const [title, setTitle] = React.useState('');
    const theme = useTheme();
    const size = useSize(props.size);
    const onChange = React.useCallback(value => {
        var _a;
        if (value) {
            setTitle(value.toString());
        }
        (_a = props.onChange) === null || _a === void 0 ? void 0 : _a.call(props, value);
    }, [props]);
    return (React.createElement(Root, Object.assign({ "data-testid": 'tend-ui-input-number' }, props, { "$fullWidth": fullWidth, "$theme": theme, ref: ref, size: size, title: title, onChange: onChange })));
};
const InputNumber = React.forwardRef(BaseInputNumber);
InputNumber.displayName = 'InputNumber';

export { InputNumber };
