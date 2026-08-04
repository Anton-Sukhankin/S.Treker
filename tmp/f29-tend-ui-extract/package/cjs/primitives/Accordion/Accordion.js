'use strict';

var tslib = require('tslib');
var React = require('react');
var tendUiTheme = require('@10d/tend-ui-theme');
var styled = require('./styled.js');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

const Accordion = React__default["default"].forwardRef((_a, ref) => {
    var { items } = _a, props = tslib.__rest(_a, ["items"]);
    const theme = tendUiTheme.useTheme();
    const itemsProp = items === null || items === void 0 ? void 0 : items.map(item => {
        const { title, description } = item, props = tslib.__rest(item, ["title", "description"]);
        if (item.label)
            return item;
        return Object.assign(Object.assign({}, props), { description, label: (React__default["default"].createElement(React__default["default"].Fragment, null,
                React__default["default"].createElement(styled.Title, { theme: theme }, title),
                React__default["default"].createElement(styled.Description, { theme: theme }, description))) });
    });
    return (React__default["default"].createElement(styled.Root, Object.assign({ "data-testid": 'tend-ui-accordion' }, props, { "$theme": theme, ref: ref, bordered: true, expandIcon: props => React__default["default"].createElement(styled.ArrowIcon, { size: 20, "$active": props.isActive }), items: itemsProp, size: 'middle', ghost: false })));
});
Accordion.displayName = 'Accordion';

exports.Accordion = Accordion;
