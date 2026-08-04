'use strict';

var AntRadio = require('antd-core/es/radio');
var styled = require('styled-components');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var AntRadio__default = /*#__PURE__*/_interopDefault(AntRadio);
var styled__default = /*#__PURE__*/_interopDefault(styled);

const Root = styled__default["default"](AntRadio__default["default"]) `
  &.tend-ui-radio-wrapper {
    /* Aligning Radio */
    .tend-ui-radio {
      align-self: flex-start;
    }

    /* Checked state */
    .tend-ui-radio-checked {
      &:not(.tend-ui-radio-disabled) {
        /* Active state color */
        .tend-ui-radio-inner {
          /* TODO: Replace by token */
          background-color: ${props => props.$theme.colors.gray0};

          /* TODO: Replace by token */
          &:after {
            background-color: ${props => props.$theme.colors.blue600};
          }
        }
      }
    }
  }
`;

exports.Root = Root;
