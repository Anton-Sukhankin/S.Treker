'use strict';

var React = require('react');
var tendUiGrid = require('@10d/tend-ui-grid');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

const Layout = ({ children }) => {
    return (React__default["default"].createElement(tendUiGrid.Box, { "$position": 'relative', "$display": 'flex', "$justifyContent": 'center', "$alignItems": 'center', "$width": '100%', "$height": '100%', "$gap": 64 }, children));
};

exports.Layout = Layout;
