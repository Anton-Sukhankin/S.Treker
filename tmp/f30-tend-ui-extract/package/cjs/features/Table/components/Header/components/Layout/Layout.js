'use strict';

var React = require('react');
var tendUiGrid = require('@10d/tend-ui-grid');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

const Layout = ({ children }) => {
    return (React__default["default"].createElement(tendUiGrid.Box, { "$display": 'flex', "$alignItems": 'center', "$mb": 8 }, children));
};
Layout.displayName = 'Table.Header.Layout';

exports.Layout = Layout;
