'use strict';

var React = require('react');
var useTranslation = require('@10d/tend-ui-locale/hooks/useTranslation');
var BarChart = require('@10d/tend-ui-icons/BarChart');
var tendUiPrimitives = require('@10d/tend-ui-primitives');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

const Analytics = ({ component: Component, href }) => {
    const t = useTranslation.useTranslation();
    const button = (React__default["default"].createElement(tendUiPrimitives.ToggleButton, { selectable: false, "aria-disabled": !Component && !href },
        React__default["default"].createElement(BarChart.BarChart, { color: 'gray900', size: 20 })));
    return (React__default["default"].createElement(tendUiPrimitives.Tooltip, { title: t(['widgets', 'Layout', 'Header', 'analytics']) }, Component ? (React__default["default"].createElement(Component, null, button)) : href ? (React__default["default"].createElement("a", { href: href, target: '_blank', rel: 'noreferrer' }, button)) : (button)));
};
Analytics.displayName = 'Layout.Header.Analytics';

exports.Analytics = Analytics;
