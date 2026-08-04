'use strict';

var tslib = require('tslib');
var React = require('react');
var tendUiTheme = require('@10d/tend-ui-theme');
var tendUiTypography = require('@10d/tend-ui-typography');
var tendUiGrid = require('@10d/tend-ui-grid');
var styled = require('./styled.js');
var Item = require('./Item/Item.js');
var index = require('./context/index.js');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

const BaseList = (_a, ref) => {
    var { gap, className, maxHeight, scrollable = false, onItemClick, header } = _a, props = tslib.__rest(_a, ["gap", "className", "maxHeight", "scrollable", "onItemClick", "header"]);
    const theme = tendUiTheme.useTheme();
    const handleItemClick = React__default["default"].useCallback((value) => {
        onItemClick === null || onItemClick === void 0 ? void 0 : onItemClick(value);
    }, [onItemClick]);
    const root = (React__default["default"].createElement(styled.Root, Object.assign({}, props, { ref: ref, "$theme": theme, "$scrollable": scrollable, "$maxHeight": maxHeight, "$gap": gap, className: ['tend-ui-list', className].filter(Boolean).join(' ') })));
    return (React__default["default"].createElement(index.ListContext.Provider, { value: React__default["default"].useMemo(() => ({ onItemClick: handleItemClick }), [handleItemClick]) }, header ? (React__default["default"].createElement(tendUiGrid.Box, { "$display": 'flex', "$flexDirection": 'column', "$gap": 8 },
        React__default["default"].createElement(tendUiTypography.Text, { color: 'gray650', size: 'small' }, header),
        root)) : (root)));
};
const ForwardedList = React__default["default"].forwardRef(BaseList);
const List = Object.assign(ForwardedList, {
    displayName: 'List',
    Item: Item.Item,
});

exports.List = List;
