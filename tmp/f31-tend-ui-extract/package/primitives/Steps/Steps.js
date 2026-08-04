import { __rest } from 'tslib';
import React from 'react';
import { useTheme } from '@10d/tend-ui-theme';
import { Box } from '@10d/tend-ui-grid';
import { Root } from './styled.js';
import { StepsHistoryApproval } from '../StepsHistoryApproval/StepsHistoryApproval.js';
import { StepsCustom } from './StepsCustom.js';
import { isHistoryStepper } from '../StepsHistoryApproval/utils.js';

const Steps = (_a) => {
    var _b, _c, _d;
    var { labelPlacement = 'vertical', direction = 'horizontal', variant = 'large' } = _a, props = __rest(_a, ["labelPlacement", "direction", "variant"]);
    const theme = useTheme();
    const [innerCurrent, setInnerCurrent] = React.useState(0);
    const children = (_b = props.items) === null || _b === void 0 ? void 0 : _b[(_c = props === null || props === void 0 ? void 0 : props.current) !== null && _c !== void 0 ? _c : innerCurrent].children;
    const current = (_d = props.current) !== null && _d !== void 0 ? _d : innerCurrent;
    const handleChange = React.useCallback((current) => {
        var _a;
        setInnerCurrent(current);
        (_a = props.onChange) === null || _a === void 0 ? void 0 : _a.call(props, current);
    }, [props]);
    const mt = {
        horizontal: '16px',
        vertical: undefined,
    }[direction];
    const flexDirection = {
        horizontal: 'column',
        vertical: 'row',
    }[direction];
    if (variant === 'medium' || variant === 'small') {
        if (!isHistoryStepper(props.current))
            return React.createElement(StepsCustom, Object.assign({}, props, { direction: direction, variant: variant }));
        if (isHistoryStepper(props.current))
            return React.createElement(StepsHistoryApproval, Object.assign({}, props));
    }
    return (React.createElement(Box, { "$display": 'flex', "$flexDirection": flexDirection },
        React.createElement(Root, Object.assign({ "data-testid": 'tend-ui-steps' }, props, { "$theme": theme, direction: direction, labelPlacement: labelPlacement, current: current, onChange: handleChange })),
        children && (React.createElement(Box, { "$width": '100%', "$mt": mt }, children))));
};
Steps.displayName = 'Steps';

export { Steps };
