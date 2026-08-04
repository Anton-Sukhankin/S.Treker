'use strict';

var styled = require('styled-components');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var styled__default = /*#__PURE__*/_interopDefault(styled);

const Text = styled__default["default"].span `
  font-family: Museo Sans Cyrl;
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
`;
const Label = styled__default["default"].label `
  transition: all 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  position: relative;
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;
  gap: 8px;
  padding: 2px 16px;
  border-radius: 100px;
  border: 1px solid;
  border-color: ${props => {
    if (props.$checked)
        return props.theme.colors.blue600;
    return props.theme.colors.gray200;
}};
  color: ${props => {
    if (props.$checked)
        return props.theme.colors.blue600;
    return props.theme.colors.gray900;
}};

  &:hover {
    cursor: pointer;
    color: ${props => props.theme.colors.blue500};
  }
  &:active {
    color: ${props => props.theme.colors.blue700};
  }
`;
const Input = styled__default["default"].input `
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
  opacity: 0;
`;

exports.Input = Input;
exports.Label = Label;
exports.Text = Text;
