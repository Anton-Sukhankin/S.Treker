'use strict';

var React = require('react');
var sortable = require('@dnd-kit/sortable');
var tendUiGrid = require('@10d/tend-ui-grid');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

const List = ({ columns, children, gap = 8, }) => {
    return (React__default["default"].createElement(sortable.SortableContext, { items: columns },
        React__default["default"].createElement(tendUiGrid.Box, { "data-testid": 'tend-ui-columns-settings-list', "$display": 'flex', "$flexDirection": 'column', "$gap": gap }, children)));
};

exports.List = List;
