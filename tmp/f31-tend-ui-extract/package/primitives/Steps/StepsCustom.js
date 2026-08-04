import { __rest } from 'tslib';
import React, { useCallback, useMemo } from 'react';
import { Tooltip } from 'antd-core';
import { Text } from '@10d/tend-ui-typography';
import { isString } from '@10d/tend-ui-utils';
import { useTheme } from '@10d/tend-ui-theme';
import { Steps } from './StepsCustom.styled.js';
import { ProcessStepTypes } from '../StepsHistoryApproval/types.js';
import { stepIcon, ICON_CONTAINER_SIZE } from '../StepsHistoryApproval/utils.js';

const StepsCustom = (_a) => {
    var { items, direction = 'horizontal', current = 0, onChange, variant = 'medium' } = _a, props = __rest(_a, ["items", "direction", "current", "onChange", "variant"]);
    const theme = useTheme();
    const handleChange = useCallback((newCurrent) => {
        onChange === null || onChange === void 0 ? void 0 : onChange(newCurrent);
    }, [onChange]);
    const getIcon = useCallback((item, index) => {
        var _a;
        if (current > index)
            return stepIcon(variant).start;
        if (current === index)
            return stepIcon(variant).active;
        return ((_a = item.step) === null || _a === void 0 ? void 0 : _a.stepType) ? stepIcon(variant)[item.step.stepType] : null;
    }, [current, variant]);
    const customItems = useMemo(() => {
        const baseItems = items.map((item, index) => {
            var _a, _b, _c;
            const isNonFinishOrCancelItem = ((_a = item.step) === null || _a === void 0 ? void 0 : _a.stepType) !== ProcessStepTypes.FINISH &&
                ((_b = item.step) === null || _b === void 0 ? void 0 : _b.stepType) !== ProcessStepTypes.CANCEL;
            return {
                title: isString(item.title) ? (React.createElement(Tooltip, { title: item.title },
                    React.createElement(Text, { ellipsis: true, color: ((_c = item.step) === null || _c === void 0 ? void 0 : _c.stepType) === 'cancel' ? 'gray900' : 'gray650', size: ['medium', 'large'].includes(variant) ? 'large' : variant }, item.title))) : (item.title),
                description: isNonFinishOrCancelItem && (React.createElement(Text, { ellipsis: true, color: 'gray400', size: 'small' }, item.description)),
                icon: getIcon(item, index),
            };
        });
        return baseItems;
    }, [getIcon, items]);
    return (React.createElement(Steps, Object.assign({ direction: direction, size: 'default', "$theme": theme, items: customItems, current: current, onChange: handleChange, variant: ICON_CONTAINER_SIZE[variant] }, props)));
};
StepsCustom.displayName = 'StepsCustom';

export { StepsCustom };
