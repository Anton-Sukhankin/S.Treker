'use strict';

var styled = require('styled-components');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var styled__default = /*#__PURE__*/_interopDefault(styled);

const Root = styled__default["default"].footer `
  background-color: ${props => props.theme.colors.gray0};
  padding: 0px 24px;
`;

exports.Root = Root;
