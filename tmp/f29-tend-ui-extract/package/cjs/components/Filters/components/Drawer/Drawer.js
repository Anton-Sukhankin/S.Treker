'use strict';

var tslib = require('tslib');
var React = require('react');
var useTranslation = require('@10d/tend-ui-locale/hooks/useTranslation');
var Drawer$1 = require('../../../../primitives/Drawer/Drawer.js');
var tendUiPrimitives = require('@10d/tend-ui-primitives');
var tendUiTheme = require('@10d/tend-ui-theme');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

const Drawer = (_a) => {
    var { loading = false, title, children } = _a, props = tslib.__rest(_a, ["loading", "title", "children"]);
    const theme = tendUiTheme.useTheme();
    const t = useTranslation.useTranslation();
    return (React__default["default"].createElement(Drawer$1.Drawer, Object.assign({}, props, { title: title ? title : t(['components', 'Filters', 'title']) }),
        React__default["default"].createElement(tendUiPrimitives.Spinner, { color: theme.colors.blue600, size: 'small', loading: loading }, children)));
};
Drawer.displayName = 'Filters.Drawer';

exports.Drawer = Drawer;
