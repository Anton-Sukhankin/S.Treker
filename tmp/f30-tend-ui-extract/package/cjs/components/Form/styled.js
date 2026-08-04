'use strict';

var AntForm = require('antd-core/es/form');
var styled = require('styled-components');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var AntForm__default = /*#__PURE__*/_interopDefault(AntForm);
var styled__default = /*#__PURE__*/_interopDefault(styled);

const Root = styled__default["default"](AntForm__default["default"]) `
  display: flex;
  flex-direction: column;
  gap: ${props => `${props.$gap || 16}px`};
`;

exports.Root = Root;
