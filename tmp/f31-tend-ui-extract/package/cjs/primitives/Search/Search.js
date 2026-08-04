'use strict';

var tslib = require('tslib');
var React = require('react');
var tendUiStyling = require('@10d/tend-ui-styling');
var Search$1 = require('@10d/tend-ui-icons/Search');
var tendUiTheme = require('@10d/tend-ui-theme');
var useAllowClear = require('../../hooks/useAllowClear.js');
var useInputTitle = require('../../hooks/useInputTitle.js');
var useSize = require('../../hooks/useSize.js');
var styled = require('./styled.js');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

const Search = React__default["default"].forwardRef((_a, ref) => {
    var { allowClear, clearIconTooltip } = _a, props = tslib.__rest(_a, ["allowClear", "clearIconTooltip"]);
    const theme = tendUiTheme.useTheme();
    const allowClearProp = useAllowClear.useAllowClear({ allowClear, clearIconTooltip });
    const { onChange, title } = useInputTitle.useInputTitle(props);
    const size = useSize.useSize(props.size);
    const _b = tendUiStyling.extractMarginProps(props), { rest: withoutMargins } = _b, margins = tslib.__rest(_b, ["rest"]);
    const _c = tendUiStyling.extractDimensionProps(withoutMargins), { rest } = _c, dimensions = tslib.__rest(_c, ["rest"]);
    return (React__default["default"].createElement(styled.Root, Object.assign({ "data-testid": 'tend-ui-search' }, rest, margins, dimensions, { ref: ref, onChange: onChange, title: title, "$theme": theme, prefix: React__default["default"].createElement(Search$1.Search, null), allowClear: allowClearProp, size: size })));
});
Search.displayName = 'Search';

exports.Search = Search;
