'use strict';

var tslib = require('tslib');
var React = require('react');
var AntForm = require('antd-core/es/form');
var Help = require('@10d/tend-ui-icons/Help');
var tendUiTheme = require('@10d/tend-ui-theme');
var styled = require('./styled.js');
var hooks = require('./hooks.js');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);
var AntForm__default = /*#__PURE__*/_interopDefault(AntForm);

const Item = (_a) => {
    var { children, width } = _a, props = tslib.__rest(_a, ["children", "width"]);
    const theme = tendUiTheme.useTheme();
    const rules = hooks.useErrorMessagePrefix(props.rules);
    const tooltip = React__default["default"].useMemo(() => {
        if (!props.tooltip)
            return;
        const icon = typeof props.tooltip.children === 'undefined' ? (React__default["default"].createElement(Help.Help, { "data-testid": 'help-icon' })) : (props.tooltip.children);
        const overlayInnerStyle = props.tooltip.lineBreak
            ? Object.assign(Object.assign({}, props.tooltip.overlayInnerStyle), { whiteSpace: 'pre-line' }) : undefined;
        return Object.assign(Object.assign({ icon }, props.tooltip), { overlayInnerStyle });
    }, [props.tooltip]);
    return (React__default["default"].createElement(styled.Root, Object.assign({}, props, { "$theme": theme, "$width": width, rules: rules, tooltip: tooltip }), children));
};
Item.displayName = 'Form.Item';
Item.useStatus = AntForm__default["default"].Item.useStatus;

exports.Item = Item;
