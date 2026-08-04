'use strict';

var styled = require('styled-components');
var AntDivider = require('antd-core/es/divider');
var isUndefined = require('@10d/tend-ui-utils/isUndefined');
var isString = require('@10d/tend-ui-utils/isString');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var styled__default = /*#__PURE__*/_interopDefault(styled);
var AntDivider__default = /*#__PURE__*/_interopDefault(AntDivider);

const Root = styled__default["default"](AntDivider__default["default"]) `
  ${props => {
    if (isUndefined.isUndefined(props.$margin))
        return;
    if (isString.isString(props.$margin))
        return styled.css `
        &.tend-ui-divider-horizontal {
          margin: ${props.$margin};
        }

        &.tend-ui-divider-vertical {
          margin-inline: ${props.$margin};
        }
      `;
    return styled.css `
      &.tend-ui-divider-horizontal {
        margin: ${props.$margin}px 0;
      }

      &.tend-ui-divider-vertical {
        margin-inline: ${props.$margin}px;
      }
    `;
}};

  &.tend-ui-divider {
    border-block-start-color: ${props => props.$color};
  }

  &.tend-ui-divider-vertical {
    border-inline-start-color: ${props => props.$color};
  }
`;

exports.Root = Root;
