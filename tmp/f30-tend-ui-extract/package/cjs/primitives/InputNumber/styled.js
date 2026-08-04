'use strict';

var styled = require('styled-components');
var AntInputNumber = require('antd-core/es/input-number');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var styled__default = /*#__PURE__*/_interopDefault(styled);
var AntInputNumber__default = /*#__PURE__*/_interopDefault(AntInputNumber);

const Root = styled__default["default"](AntInputNumber__default["default"]) `
  ${props => props.$fullWidth &&
    styled.css `
      &.tend-ui-input-number,
      &.tend-ui-input-number-affix-wrapper {
        width: 100%;
      }
    `}

  input {
    text-overflow: ellipsis;
  }

  &.tend-ui-input-number-affix-wrapper {
    .tend-ui-input-number-prefix,
    .tend-ui-input-number-suffix {
      color: ${props => props.$theme.colors.gray500};
    }
  }
`;

exports.Root = Root;
