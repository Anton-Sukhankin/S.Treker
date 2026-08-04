'use strict';

var React = require('react');
var styled = require('./styled.js');
var CollapseContext = require('../../contexts/CollapseContext.js');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

const Header = ({ children }) => {
    const { onClick } = CollapseContext.useCollapseContext();
    return (React__default["default"].createElement(styled.Root, { onClick: onClick, className: 'tend-ui-collapse-header' }, children));
};
Header.displayName = 'Collapse.Header';

exports.Header = Header;
