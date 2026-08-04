'use strict';

var React = require('react');
var FilterAlt = require('@10d/tend-ui-icons/FilterAlt');
var tendUiTheme = require('@10d/tend-ui-theme');
var styled = require('./styled.js');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

const useColumns = (columns) => {
    const theme = tendUiTheme.useTheme();
    const filterIcon = React__default["default"].useCallback(() => React__default["default"].createElement(FilterAlt.FilterAlt, null), []);
    const sortIcon = React__default["default"].useCallback((props) => {
        return React__default["default"].createElement(styled.FilterListIcon, { "$theme": theme, "$sortOrder": props.sortOrder });
    }, [theme]);
    if (!columns)
        return [];
    return columns.map(column => {
        return Object.assign(Object.assign({}, column), { filterIcon,
            sortIcon });
    });
};

exports.useColumns = useColumns;
