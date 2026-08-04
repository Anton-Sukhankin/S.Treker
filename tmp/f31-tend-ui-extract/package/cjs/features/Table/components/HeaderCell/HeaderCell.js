'use strict';

var tslib = require('tslib');
var React = require('react');
var tendUiTheme = require('@10d/tend-ui-theme');
var CellTitle = require('../CellTitle/CellTitle.js');
var styled = require('./styled.js');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

const HeaderCell = (_a) => {
    var { className, id = '' } = _a, props = tslib.__rest(_a, ["className", "id"]);
    const theme = tendUiTheme.useTheme();
    return (React__default["default"].createElement(styled.Root, Object.assign({ theme: theme }, props, { className: ['tend-ui-features-table-cell', className].filter(Boolean).join(' ') }),
        React__default["default"].createElement(CellTitle.CellTitle, { id: id }, props.children)));
};
HeaderCell.displayName = 'Table.HeaderCell';

exports.HeaderCell = HeaderCell;
