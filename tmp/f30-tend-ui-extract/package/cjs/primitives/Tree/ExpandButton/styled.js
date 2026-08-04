'use strict';

var styled = require('styled-components');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var styled__default = /*#__PURE__*/_interopDefault(styled);

const Button = styled__default["default"].button `
  cursor: pointer;
  padding: 0;
  margin: 0;
  display: inline-flex;
  background: transparent;
  border-radius: 4px;
  border: 1px solid;
  border-color: ${props => props.theme.colors.gray200};
  color: ${props => props.theme.colors.gray900};
`;

exports.Button = Button;
