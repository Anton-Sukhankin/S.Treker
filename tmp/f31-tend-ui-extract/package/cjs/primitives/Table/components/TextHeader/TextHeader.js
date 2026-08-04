'use strict';

var React = require('react');
var styled = require('./styled.js');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

const TextHeader = ({ children, width }) => {
    return (React__default["default"].createElement(styled.Root, { style: { width, margin: 0 }, component: 'div', ellipsis: { rows: 1, tooltip: children }, className: 'tend-ui-table-text-header' }, children));
};
TextHeader.displayName = 'Table.TextHeader';

exports.TextHeader = TextHeader;
