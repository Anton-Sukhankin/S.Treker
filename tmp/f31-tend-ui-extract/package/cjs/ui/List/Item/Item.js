'use strict';

var tslib = require('tslib');
var React = require('react');
var tendUiTheme = require('@10d/tend-ui-theme');
var tendUiGrid = require('@10d/tend-ui-grid');
var styled = require('./styled.js');
var index = require('../context/index.js');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

const Item = React__default["default"].forwardRef((_a, ref) => {
    var { children, before, after, disabled = false, className, onClick, value } = _a, props = tslib.__rest(_a, ["children", "before", "after", "disabled", "className", "onClick", "value"]);
    const theme = tendUiTheme.useTheme();
    const context = index.useListContext();
    const handleClick = React__default["default"].useCallback((e) => {
        var _a;
        if (disabled)
            return;
        onClick === null || onClick === void 0 ? void 0 : onClick(e, value);
        (_a = context === null || context === void 0 ? void 0 : context.onItemClick) === null || _a === void 0 ? void 0 : _a.call(context, value);
    }, [disabled, onClick, value, context === null || context === void 0 ? void 0 : context.onItemClick]);
    return (React__default["default"].createElement(styled.Root, Object.assign({}, props, { ref: ref, theme: theme, "$disabled": disabled, className: ['tend-ui-list-item', className].filter(Boolean).join(' '), value: value, onClick: handleClick }),
        before,
        React__default["default"].createElement(tendUiGrid.Box, { as: 'span', "$width": '100%' }, children),
        after));
});
Item.displayName = 'List.Item';

exports.Item = Item;
