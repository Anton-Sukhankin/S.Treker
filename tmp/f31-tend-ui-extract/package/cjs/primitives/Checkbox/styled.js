'use strict';

var AntCheckbox = require('antd-core/es/checkbox/Checkbox');
var AntCheckboxGroup = require('antd-core/es/checkbox/Group');
var styled = require('styled-components');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var AntCheckbox__default = /*#__PURE__*/_interopDefault(AntCheckbox);
var AntCheckboxGroup__default = /*#__PURE__*/_interopDefault(AntCheckboxGroup);
var styled__default = /*#__PURE__*/_interopDefault(styled);

const Root = styled__default["default"](AntCheckbox__default["default"]) `
  /* Aligning checkbox and label to the start */
  .tend-ui-checkbox {
    align-self: flex-start;
  }
  .tend-ui-checkbox-indeterminate .tend-ui-checkbox-inner:after {
    border-radius: 2px;
  }
`;
const GroupRoot = styled__default["default"](AntCheckboxGroup__default["default"]) `
  &.tend-ui-checkbox-group {
    .tend-ui-checkbox + span {
      overflow-wrap: anywhere;
    }
  }

  ${props => {
    if (props.$layout === 'horizontal')
        return styled.css `
        column-gap: 16px;
      `;
    return styled.css `
      flex-direction: column;
      row-gap: 8px;
    `;
}}
  ${props => props.$fullWidth &&
    styled.css `
      &.tend-ui-checkbox-group {
        width: 100%;
        .tend-ui-checkbox + span {
          display: inline-block;
          width: 100%;
        }
      }
    `};
`;

exports.GroupRoot = GroupRoot;
exports.Root = Root;
