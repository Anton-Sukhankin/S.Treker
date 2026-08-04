'use strict';

var React = require('react');
var tendUiGrid = require('@10d/tend-ui-grid');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

const List = ({ children, gap = 8 }) => {
    return (React__default["default"].createElement(tendUiGrid.Box, { "data-testid": 'tend-ui-filters-list', "$display": 'flex', "$flexDirection": 'column', "$gap": gap }, children));
};
List.displayName = 'Filters.List';

exports.List = List;
