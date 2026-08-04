'use strict';

var tslib = require('tslib');
var React = require('react');
var antdCore = require('antd-core');
var tendUiTypography = require('@10d/tend-ui-typography');
var tendUiUtils = require('@10d/tend-ui-utils');
var tendUiTheme = require('@10d/tend-ui-theme');
var StepsCustom_styled = require('./StepsCustom.styled.js');
var types = require('../StepsHistoryApproval/types.js');
var utils = require('../StepsHistoryApproval/utils.js');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

const StepsCustom = (_a) => {
    var { items, direction = 'horizontal', current = 0, onChange, variant = 'medium' } = _a, props = tslib.__rest(_a, ["items", "direction", "current", "onChange", "variant"]);
    const theme = tendUiTheme.useTheme();
    const handleChange = React.useCallback((newCurrent) => {
        onChange === null || onChange === void 0 ? void 0 : onChange(newCurrent);
    }, [onChange]);
    const getIcon = React.useCallback((item, index) => {
        var _a;
        if (current > index)
            return utils.stepIcon(variant).start;
        if (current === index)
            return utils.stepIcon(variant).active;
        return ((_a = item.step) === null || _a === void 0 ? void 0 : _a.stepType) ? utils.stepIcon(variant)[item.step.stepType] : null;
    }, [current, variant]);
    const customItems = React.useMemo(() => {
        const baseItems = items.map((item, index) => {
            var _a, _b, _c;
            const isNonFinishOrCancelItem = ((_a = item.step) === null || _a === void 0 ? void 0 : _a.stepType) !== types.ProcessStepTypes.FINISH &&
                ((_b = item.step) === null || _b === void 0 ? void 0 : _b.stepType) !== types.ProcessStepTypes.CANCEL;
            return {
                title: tendUiUtils.isString(item.title) ? (React__default["default"].createElement(antdCore.Tooltip, { title: item.title },
                    React__default["default"].createElement(tendUiTypography.Text, { ellipsis: true, color: ((_c = item.step) === null || _c === void 0 ? void 0 : _c.stepType) === 'cancel' ? 'gray900' : 'gray650', size: ['medium', 'large'].includes(variant) ? 'large' : variant }, item.title))) : (item.title),
                description: isNonFinishOrCancelItem && (React__default["default"].createElement(tendUiTypography.Text, { ellipsis: true, color: 'gray400', size: 'small' }, item.description)),
                icon: getIcon(item, index),
            };
        });
        return baseItems;
    }, [getIcon, items]);
    return (React__default["default"].createElement(StepsCustom_styled.Steps, Object.assign({ direction: direction, size: 'default', "$theme": theme, items: customItems, current: current, onChange: handleChange, variant: utils.ICON_CONTAINER_SIZE[variant] }, props)));
};
StepsCustom.displayName = 'StepsCustom';

exports.StepsCustom = StepsCustom;
