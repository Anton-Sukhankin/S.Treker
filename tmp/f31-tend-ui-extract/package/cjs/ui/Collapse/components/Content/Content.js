'use strict';

var React = require('react');
var tendUiTheme = require('@10d/tend-ui-theme');
var tendUiGrid = require('@10d/tend-ui-grid');
var styled = require('./styled.js');
var CollapseContext = require('../../contexts/CollapseContext.js');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

const Content = ({ children }) => {
    const context = CollapseContext.useCollapseContext();
    const theme = tendUiTheme.useTheme();
    return (React__default["default"].createElement(styled.Root, { theme: theme, "$open": context.open, "data-state": context.open.toString(), className: 'tend-ui-collapse-content' },
        React__default["default"].createElement(tendUiGrid.Box, { "$padding": '8px 0 0 24px' }, children)));
};
Content.displayName = 'Collapse.Content';

exports.Content = Content;
