'use strict';

var AntPassword = require('antd-core/es/input/Password');
var styled = require('styled-components');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var AntPassword__default = /*#__PURE__*/_interopDefault(AntPassword);
var styled__default = /*#__PURE__*/_interopDefault(styled);

const Root = styled__default["default"](AntPassword__default["default"]) `
  .tend-ui-input-prefix,
  .tend-ui-input-suffix {
    color: ${props => props.$theme.colors.gray500};
  }
`;

exports.Root = Root;
