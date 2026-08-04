'use strict';

var styled = require('styled-components');
var tendUiStyling = require('@10d/tend-ui-styling');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var styled__default = /*#__PURE__*/_interopDefault(styled);

const Root = styled__default["default"].span.attrs({
    $sizes: {
        xl: styled.css `
      width: 80px;
      height: 80px;
    `,
        large: styled.css `
      width: 48px;
      height: 48px;
    `,
        medium: styled.css `
      width: 40px;
      height: 40px;
    `,
        small: styled.css `
      width: 32px;
      height: 32px;
    `,
    },
}) `
  font-family: Museo Sans Cyrl;
  color: ${props => props.theme.colors.blue600};
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px;

  box-sizing: border-box;
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  border-radius: 50%;
  ${tendUiStyling.backgroundColor};
  overflow: hidden;
  ${props => props.$sizes[props.$size]};
  ${tendUiStyling.pointer};
  border-style: solid;
  border-color: ${props => (props.$bordered ? props.$borderColor : 'transparent')};
  border-width: 2px;
  transition: 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  transition-property: border-color;

  &:hover {
    border-color: ${props => props.theme.colors.blue100};
  }
`;

exports.Root = Root;
