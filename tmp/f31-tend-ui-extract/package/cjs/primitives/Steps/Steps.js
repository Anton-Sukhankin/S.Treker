'use strict';

var tslib = require('tslib');
var React = require('react');
var tendUiTheme = require('@10d/tend-ui-theme');
var tendUiGrid = require('@10d/tend-ui-grid');
var styled = require('./styled.js');
var StepsHistoryApproval = require('../StepsHistoryApproval/StepsHistoryApproval.js');
var StepsCustom = require('./StepsCustom.js');
var utils = require('../StepsHistoryApproval/utils.js');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

const Steps = (_a) => {
    var _b, _c, _d;
    var { labelPlacement = 'vertical', direction = 'horizontal', variant = 'large' } = _a, props = tslib.__rest(_a, ["labelPlacement", "direction", "variant"]);
    const theme = tendUiTheme.useTheme();
    const [innerCurrent, setInnerCurrent] = React__default["default"].useState(0);
    const children = (_b = props.items) === null || _b === void 0 ? void 0 : _b[(_c = props === null || props === void 0 ? void 0 : props.current) !== null && _c !== void 0 ? _c : innerCurrent].children;
    const current = (_d = props.current) !== null && _d !== void 0 ? _d : innerCurrent;
    const handleChange = React__default["default"].useCallback((current) => {
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
        if (!utils.isHistoryStepper(props.current))
            return React__default["default"].createElement(StepsCustom.StepsCustom, Object.assign({}, props, { direction: direction, variant: variant }));
        if (utils.isHistoryStepper(props.current))
            return React__default["default"].createElement(StepsHistoryApproval.StepsHistoryApproval, Object.assign({}, props));
    }
    return (React__default["default"].createElement(tendUiGrid.Box, { "$display": 'flex', "$flexDirection": flexDirection },
        React__default["default"].createElement(styled.Root, Object.assign({ "data-testid": 'tend-ui-steps' }, props, { "$theme": theme, direction: direction, labelPlacement: labelPlacement, current: current, onChange: handleChange })),
        children && (React__default["default"].createElement(tendUiGrid.Box, { "$width": '100%', "$mt": mt }, children))));
};
Steps.displayName = 'Steps';

exports.Steps = Steps;
