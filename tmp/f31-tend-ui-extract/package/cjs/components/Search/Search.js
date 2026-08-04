'use strict';

var tslib = require('tslib');
var React = require('react');
var Search$1 = require('@10d/tend-ui-icons/Search');
var tendUiPrimitives = require('@10d/tend-ui-primitives');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

const Search = React__default["default"].forwardRef((_a, ref) => {
    var { onSearch, onChange } = _a, props = tslib.__rest(_a, ["onSearch", "onChange"]);
    const handleChange = React__default["default"].useCallback((e) => {
        onChange === null || onChange === void 0 ? void 0 : onChange(e);
        onSearch === null || onSearch === void 0 ? void 0 : onSearch(e.target.value);
    }, [onChange, onSearch]);
    return React__default["default"].createElement(tendUiPrimitives.Input, Object.assign({ ref: ref }, props, { prefix: React__default["default"].createElement(Search$1.Search, null), onChange: handleChange }));
});
Search.displayName = 'Search';

exports.Search = Search;
