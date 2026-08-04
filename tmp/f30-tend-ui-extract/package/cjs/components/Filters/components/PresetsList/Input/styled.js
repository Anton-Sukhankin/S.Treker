'use strict';

var styled = require('styled-components');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var styled__default = /*#__PURE__*/_interopDefault(styled);

const Root = styled__default["default"].input `
  font-size: 14px;
  line-height: 20px;
  font-weight: 500;
  border-radius: 4px;
  border: 1px solid ${props => props.theme.colors.blue600};
  background-color: ${props => props.theme.colors.gray50};

  margin: 0;
  padding: 0;
`;

exports.Root = Root;
