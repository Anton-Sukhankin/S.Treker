'use strict';

var styled = require('styled-components');
var AntCollapse = require('antd-core/es/collapse');
var ChevronDown = require('@10d/tend-ui-icons/ChevronDown');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var styled__default = /*#__PURE__*/_interopDefault(styled);
var AntCollapse__default = /*#__PURE__*/_interopDefault(AntCollapse);

const Root = styled__default["default"](AntCollapse__default["default"]) `
  &.tend-ui-collapse > .tend-ui-collapse-item > .tend-ui-collapse-header {
    &[aria-expanded='true'] {
      background-color: ${props => props.$theme.colors.gray50};
    }
    &:hover {
      background-color: ${props => props.$theme.colors.gray100};
    }
  }
`;
const Title = styled__default["default"].div `
  font-family: ${props => props.theme.fonts.museo};
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 1.5;
`;
const Description = styled__default["default"].div `
  font-family: ${props => props.theme.fonts.museo};
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 1.42857;
`;
const ArrowIcon = styled__default["default"](ChevronDown.ChevronDown) `
  transform: ${props => (props.$active ? 'rotate(0)' : 'rotate(-90deg)')};
  transition: transform 0.3s;
`;

exports.ArrowIcon = ArrowIcon;
exports.Description = Description;
exports.Root = Root;
exports.Title = Title;
