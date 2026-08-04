'use strict';

var AntRadio = require('antd-core/es/radio');
var styled = require('styled-components');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var AntRadio__default = /*#__PURE__*/_interopDefault(AntRadio);
var styled__default = /*#__PURE__*/_interopDefault(styled);

// eslint-disable-next-line import/no-named-as-default-member
const Root = styled__default["default"](AntRadio__default["default"].Group) `
  &.tend-ui-radio-group {
    display: inline-flex;

    ${props => {
    if (props.$layout === 'vertical') {
        return styled.css `
          flex-direction: column;
          row-gap: 8px;
        `;
    }
    return styled.css `
        .tend-ui-radio-wrapper {
          margin-inline-end: 16px;
        }
      `;
}}

    .tend-ui-radio-wrapper {
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
    ${props => props.$fullWidth &&
    styled.css `
        &.tend-ui-radio-group {
          width: 100%;
          .tend-ui-radio + span {
            display: inline-block;
            width: 100%;
          }
        }
      `};
  }
`;

exports.Root = Root;
