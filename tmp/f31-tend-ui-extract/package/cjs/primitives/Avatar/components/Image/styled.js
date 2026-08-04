'use strict';

var styled = require('styled-components');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var styled__default = /*#__PURE__*/_interopDefault(styled);

const Root = styled__default["default"].img `
  width: 100%;
  height: 100%;
  object-fit: ${props => props.$objectFit};
`;

exports.Root = Root;
