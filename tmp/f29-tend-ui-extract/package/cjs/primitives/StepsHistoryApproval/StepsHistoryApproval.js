'use strict';

var tslib = require('tslib');
var React = require('react');
var tendUiTypography = require('@10d/tend-ui-typography');
var tendUiTheme = require('@10d/tend-ui-theme');
var Box = require('@10d/tend-ui-grid/Box');
var styled = require('./styled.js');
var types = require('./types.js');
var utils = require('./utils.js');
var ApprovalsGroupList = require('./components/ApprovalsGroupList.js');
var ApprovalsList = require('./components/ApprovalsList.js');
var StepContent = require('./components/StepContent.js');
var StepTitle = require('./components/StepTitle.js');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

const StepsHistoryApproval = (_a) => {
    var { currentStepTitle, currentApprovalUsers, currentApprovalGroups, items, showAvatar = true, direction = 'vertical', current, onChange } = _a, props = tslib.__rest(_a, ["currentStepTitle", "currentApprovalUsers", "currentApprovalGroups", "items", "showAvatar", "direction", "current", "onChange"]);
    const theme = tendUiTheme.useTheme();
    const handleChange = React.useCallback((newCurrent) => {
        onChange === null || onChange === void 0 ? void 0 : onChange(newCurrent);
    }, [onChange]);
    const getCurrentStepItem = React.useCallback(() => ({
        title: (React__default["default"].createElement(tendUiTypography.Text, { mb: 8, color: 'gray900', size: 'large' }, currentStepTitle !== null && currentStepTitle !== void 0 ? currentStepTitle : 'Текущий шаг')),
        description: (React__default["default"].createElement(Box.Box, null,
            currentApprovalUsers && (React__default["default"].createElement(ApprovalsList.ApprovalsList, { list: currentApprovalUsers, showAvatar: showAvatar })),
            currentApprovalGroups && (React__default["default"].createElement(ApprovalsGroupList.ApprovalsGroupList, { list: currentApprovalGroups, showAvatar: showAvatar })))),
        icon: utils.stepIcon('medium')[types.ProcessStepTypes.ACTIVE],
    }), [currentApprovalUsers, currentApprovalGroups, currentStepTitle, showAvatar]);
    const getFutureStepItem = React.useCallback(() => ({
        icon: utils.stepIcon('medium')[types.ProcessStepTypes.FUTURE],
    }), []);
    const getIcon = React.useCallback(item => { var _a; return (((_a = item.step) === null || _a === void 0 ? void 0 : _a.stepType) ? utils.stepIcon('medium')[item.step.stepType] : null); }, []);
    const customItems = React.useMemo(() => {
        var _a, _b;
        const baseItems = items.map((item, index) => {
            var _a, _b, _c, _d, _e, _f, _g;
            const isFinishOrCancelItem = ((_a = item.step) === null || _a === void 0 ? void 0 : _a.stepType) !== types.ProcessStepTypes.FINISH &&
                ((_b = item.step) === null || _b === void 0 ? void 0 : _b.stepType) !== types.ProcessStepTypes.CANCEL;
            const isShouldRenderCancelIcon = items.length - 1 !== index &&
                ((_c = items[index + 1].step) === null || _c === void 0 ? void 0 : _c.stepType) === types.ProcessStepTypes.CANCEL;
            if (isShouldRenderCancelIcon) {
                return {
                    title: (React__default["default"].createElement(StepTitle.StepTitle, { stepType: (_d = item.step) === null || _d === void 0 ? void 0 : _d.stepType, title: item.title, subTitle: item.subTitle, created: item.created })),
                    description: isFinishOrCancelItem &&
                        ((_e = item.description) !== null && _e !== void 0 ? _e : React__default["default"].createElement(StepContent.StepContent, { step: item, showAvatar: showAvatar })),
                    icon: utils.stepIcon('medium')[types.ProcessStepTypes.CANCEL],
                };
            }
            return {
                title: (React__default["default"].createElement(StepTitle.StepTitle, { stepType: (_f = item.step) === null || _f === void 0 ? void 0 : _f.stepType, title: item.title, subTitle: item.subTitle, created: item.created })),
                description: isFinishOrCancelItem &&
                    ((_g = item.description) !== null && _g !== void 0 ? _g : React__default["default"].createElement(StepContent.StepContent, { step: item, showAvatar: showAvatar })),
                icon: getIcon(item),
            };
        });
        const lastItem = items[items.length - 1];
        if (((_a = lastItem.step) === null || _a === void 0 ? void 0 : _a.stepType) !== types.ProcessStepTypes.FINISH &&
            ((_b = lastItem.step) === null || _b === void 0 ? void 0 : _b.stepType) !== types.ProcessStepTypes.CANCEL) {
            return [...baseItems, getCurrentStepItem(), getFutureStepItem()];
        }
        return baseItems;
    }, [getCurrentStepItem, getFutureStepItem, getIcon, items, showAvatar]);
    return (React__default["default"].createElement(styled.Steps, Object.assign({ direction: direction, size: 'default', "$theme": theme, items: customItems, onChange: handleChange, current: current }, props)));
};
StepsHistoryApproval.displayName = 'StepsHistoryApproval';

exports.StepsHistoryApproval = StepsHistoryApproval;
