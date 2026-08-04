'use strict';

var tslib = require('tslib');
var React = require('react');
var tendUiStyling = require('@10d/tend-ui-styling');
var styled = require('./styled.js');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

const sizes = { small: '24px', medium: '32px', large: '40px' };
const Skeleton = (_a) => {
    var { skeleton = true, size = 'medium', children, display, height, borderRadius = '8px', 
    // FIXME: Использовать палитру дизайн системы
    backgroundColor = '#F0F0F0', className } = _a, props = tslib.__rest(_a, ["skeleton", "size", "children", "display", "height", "borderRadius", "backgroundColor", "className"]);
    const _b = tendUiStyling.extractMarginProps(props), { rest } = _b, margins = tslib.__rest(_b, ["rest"]);
    const _c = tendUiStyling.extractPaddingProps(rest), { rest: withoutPaddings } = _c, paddings = tslib.__rest(_c, ["rest"]);
    const layout = tslib.__rest(tendUiStyling.extractLayoutProps(withoutPaddings), []);
    const _height = height ? height : sizes[size];
    if (!skeleton)
        return React__default["default"].createElement(React__default["default"].Fragment, null, children);
    return (React__default["default"].createElement(styled.Root, Object.assign({}, layout, { "$display": display, "$mt": margins.$marginTop, "$mr": margins.$marginRight, "$mb": margins.$marginBottom, "$ml": margins.$marginLeft, "$pt": paddings.$paddingTop, "$pr": paddings.$paddingRight, "$pb": paddings.$paddingBottom, "$pl": paddings.$paddingLeft, "$backgroundColor": backgroundColor, "$borderRadius": borderRadius, "$height": _height, className: ['tend-ui-skeleton-root', className].filter(Boolean).join(' ') })));
};
Skeleton.displayName = 'Skeleton';

exports.Skeleton = Skeleton;
