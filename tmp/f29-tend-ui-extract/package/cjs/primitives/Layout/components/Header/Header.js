'use strict';

var tslib = require('tslib');
var React = require('react');
var tendUiStyling = require('@10d/tend-ui-styling');
var tendUiTheme = require('@10d/tend-ui-theme');
var useScroll = require('../../hooks/useScroll.js');
var SizeContext = require('../../contexts/SizeContext.js');
var styled = require('./styled.js');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

const Header = (_a) => {
    var { children, sticky = false, className } = _a, props = tslib.__rest(_a, ["children", "sticky", "className"]);
    const theme = tendUiTheme.useTheme();
    const { size } = SizeContext.useSizeContext();
    const ref = React__default["default"].useRef(null);
    const { register } = useScroll.useScroll();
    register('header', ref);
    const _b = tendUiStyling.extractMarginProps(props), { rest: withoutMargins } = _b, margins = tslib.__rest(_b, ["rest"]);
    const _c = tendUiStyling.extractPaddingProps(withoutMargins), { rest } = _c, paddings = tslib.__rest(_c, ["rest"]);
    return (React__default["default"].createElement(styled.Root, Object.assign({}, rest, margins, paddings, { ref: ref, className: ['tend-ui-layout-header', className].filter(Boolean).join(' '), theme: theme, "$sticky": sticky, "$size": size }), children));
};
Header.displayName = 'Layout.Header';

exports.Header = Header;
