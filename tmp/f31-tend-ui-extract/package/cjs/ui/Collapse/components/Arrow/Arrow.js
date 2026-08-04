'use strict';

var React = require('react');
var ChevronDown = require('@10d/tend-ui-icons/ChevronDown');
var ChevronRight = require('@10d/tend-ui-icons/ChevronRight');
var CollapseContext = require('../../contexts/CollapseContext.js');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

const Arrow = () => {
    const { open } = CollapseContext.useCollapseContext();
    return open ? (React__default["default"].createElement(ChevronDown.ChevronDown, { size: 20, color: 'gray500' })) : (React__default["default"].createElement(ChevronRight.ChevronRight, { size: 20, color: 'gray500' }));
};
Arrow.displayName = 'Collapse.Arrow';

exports.Arrow = Arrow;
