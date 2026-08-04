'use strict';

var tslib = require('tslib');
var React = require('react');
var tendUiTheme = require('@10d/tend-ui-theme');
var useSize = require('../../hooks/useSize.js');
var More = require('./More.js');
var styled = require('./styled.js');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

const Tabs = React__default["default"].forwardRef((_a, ref) => {
    var { moreText } = _a, props = tslib.__rest(_a, ["moreText"]);
    const theme = tendUiTheme.useTheme();
    const hasMoreIcon = typeof props.moreIcon !== 'undefined';
    const size = useSize.useSize(props.size);
    return (React__default["default"].createElement(styled.Root, Object.assign({ "data-testid": 'tend-ui-tabs', moreIcon: React__default["default"].createElement(More.More, null, moreText) }, props, { ref: ref, "$customMoreIcon": hasMoreIcon, "$theme": theme, size: size })));
});
Tabs.displayName = 'Tabs';

exports.Tabs = Tabs;
