'use strict';

var tslib = require('tslib');
var React = require('react');
var isString = require('@10d/tend-ui-utils/isString');
var tendUiTypography = require('@10d/tend-ui-typography');
var Root = require('./components/Root/Root.js');
var Header = require('./components/Header/Header.js');
var Arrow = require('./components/Arrow/Arrow.js');
var Content = require('./components/Content/Content.js');
var Group = require('./components/Group/Group.js');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

const BaseCollapse = React__default["default"].forwardRef((_a, ref) => {
    var { open, label, children, onOpenChange, arrowPosition = 'start' } = _a, props = tslib.__rest(_a, ["open", "label", "children", "onOpenChange", "arrowPosition"]);
    const showArrowStart = arrowPosition === 'start';
    const showArrowEnd = arrowPosition === 'end';
    return (React__default["default"].createElement(Root.Root, Object.assign({}, props, { ref: ref, open: open, onOpenChange: onOpenChange }),
        React__default["default"].createElement(Header.Header, null,
            showArrowStart && React__default["default"].createElement(Arrow.Arrow, null),
            isString.isString(label) ? React__default["default"].createElement(tendUiTypography.Text, null, label) : label,
            showArrowEnd && React__default["default"].createElement(Arrow.Arrow, null)),
        React__default["default"].createElement(Content.Content, null, children)));
});
const Collapse = Object.assign(BaseCollapse, {
    displayName: 'Collapse',
    Group: Group.Group,
    Root: Root.Root,
    Header: Header.Header,
    Arrow: Arrow.Arrow,
    Content: Content.Content,
});

exports.Collapse = Collapse;
