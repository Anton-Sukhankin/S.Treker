'use strict';

var React = require('react');
var styled = require('styled-components');
var ChevronDown = require('@10d/tend-ui-icons/ChevronDown');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);
var styled__default = /*#__PURE__*/_interopDefault(styled);

const Wrapper = styled__default["default"].span `
  /* TODO: Move to a token */
  font-size: 14px;

  display: inline-flex;
  align-items: center;
`;
const More = ({ children = 'Ещë' }) => {
    return (React__default["default"].createElement(Wrapper, null,
        children,
        React__default["default"].createElement(ChevronDown.ChevronDown, null)));
};

exports.More = More;
