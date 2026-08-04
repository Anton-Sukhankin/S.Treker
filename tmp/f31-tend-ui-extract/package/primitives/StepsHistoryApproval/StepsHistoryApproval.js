import { __rest } from 'tslib';
import React, { useCallback, useMemo } from 'react';
import { Text } from '@10d/tend-ui-typography';
import { useTheme } from '@10d/tend-ui-theme';
import { Box } from '@10d/tend-ui-grid/Box';
import { Steps } from './styled.js';
import { ProcessStepTypes } from './types.js';
import { stepIcon } from './utils.js';
import { ApprovalsGroupList } from './components/ApprovalsGroupList.js';
import { ApprovalsList } from './components/ApprovalsList.js';
import { StepContent } from './components/StepContent.js';
import { StepTitle } from './components/StepTitle.js';

const StepsHistoryApproval = (_a) => {
    var { currentStepTitle, currentApprovalUsers, currentApprovalGroups, items, showAvatar = true, direction = 'vertical', current, onChange } = _a, props = __rest(_a, ["currentStepTitle", "currentApprovalUsers", "currentApprovalGroups", "items", "showAvatar", "direction", "current", "onChange"]);
    const theme = useTheme();
    const handleChange = useCallback((newCurrent) => {
        onChange === null || onChange === void 0 ? void 0 : onChange(newCurrent);
    }, [onChange]);
    const getCurrentStepItem = useCallback(() => ({
        title: (React.createElement(Text, { mb: 8, color: 'gray900', size: 'large' }, currentStepTitle !== null && currentStepTitle !== void 0 ? currentStepTitle : 'Текущий шаг')),
        description: (React.createElement(Box, null,
            currentApprovalUsers && (React.createElement(ApprovalsList, { list: currentApprovalUsers, showAvatar: showAvatar })),
            currentApprovalGroups && (React.createElement(ApprovalsGroupList, { list: currentApprovalGroups, showAvatar: showAvatar })))),
        icon: stepIcon('medium')[ProcessStepTypes.ACTIVE],
    }), [currentApprovalUsers, currentApprovalGroups, currentStepTitle, showAvatar]);
    const getFutureStepItem = useCallback(() => ({
        icon: stepIcon('medium')[ProcessStepTypes.FUTURE],
    }), []);
    const getIcon = useCallback(item => { var _a; return (((_a = item.step) === null || _a === void 0 ? void 0 : _a.stepType) ? stepIcon('medium')[item.step.stepType] : null); }, []);
    const customItems = useMemo(() => {
        var _a, _b;
        const baseItems = items.map((item, index) => {
            var _a, _b, _c, _d, _e, _f, _g;
            const isFinishOrCancelItem = ((_a = item.step) === null || _a === void 0 ? void 0 : _a.stepType) !== ProcessStepTypes.FINISH &&
                ((_b = item.step) === null || _b === void 0 ? void 0 : _b.stepType) !== ProcessStepTypes.CANCEL;
            const isShouldRenderCancelIcon = items.length - 1 !== index &&
                ((_c = items[index + 1].step) === null || _c === void 0 ? void 0 : _c.stepType) === ProcessStepTypes.CANCEL;
            if (isShouldRenderCancelIcon) {
                return {
                    title: (React.createElement(StepTitle, { stepType: (_d = item.step) === null || _d === void 0 ? void 0 : _d.stepType, title: item.title, subTitle: item.subTitle, created: item.created })),
                    description: isFinishOrCancelItem &&
                        ((_e = item.description) !== null && _e !== void 0 ? _e : React.createElement(StepContent, { step: item, showAvatar: showAvatar })),
                    icon: stepIcon('medium')[ProcessStepTypes.CANCEL],
                };
            }
            return {
                title: (React.createElement(StepTitle, { stepType: (_f = item.step) === null || _f === void 0 ? void 0 : _f.stepType, title: item.title, subTitle: item.subTitle, created: item.created })),
                description: isFinishOrCancelItem &&
                    ((_g = item.description) !== null && _g !== void 0 ? _g : React.createElement(StepContent, { step: item, showAvatar: showAvatar })),
                icon: getIcon(item),
            };
        });
        const lastItem = items[items.length - 1];
        if (((_a = lastItem.step) === null || _a === void 0 ? void 0 : _a.stepType) !== ProcessStepTypes.FINISH &&
            ((_b = lastItem.step) === null || _b === void 0 ? void 0 : _b.stepType) !== ProcessStepTypes.CANCEL) {
            return [...baseItems, getCurrentStepItem(), getFutureStepItem()];
        }
        return baseItems;
    }, [getCurrentStepItem, getFutureStepItem, getIcon, items, showAvatar]);
    return (React.createElement(Steps, Object.assign({ direction: direction, size: 'default', "$theme": theme, items: customItems, onChange: handleChange, current: current }, props)));
};
StepsHistoryApproval.displayName = 'StepsHistoryApproval';

export { StepsHistoryApproval };
