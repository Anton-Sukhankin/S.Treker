'use strict';

var styled = require('styled-components');
var tendUiStyling = require('@10d/tend-ui-styling');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var styled__default = /*#__PURE__*/_interopDefault(styled);

const Root = styled__default["default"].div.attrs({
    $borders: {
        success: styled.css `
      border: 1px solid ${props => props.theme.colors.green600};
    `,
        error: styled.css `
      border: 1px solid ${props => props.theme.colors.red600};
    `,
        warning: styled.css `
      border: 1px solid ${props => props.theme.colors.gold600};
    `,
        info: styled.css `
      border: 1px solid ${props => props.theme.colors['gray50-transparent']};
    `,
        neutral: styled.css `
      border: 1px solid ${props => props.theme.colors.gray400};
    `,
        loading: styled.css `
      border: 1px solid ${props => props.theme.colors.gray400};
    `,
    },
    $layouts: {
        success: styled.css `
      background-color: ${props => props.theme.colors['green100-transparent']};
    `,
        error: styled.css `
      background-color: ${props => props.theme.colors['red100-transparent']};
    `,
        warning: styled.css `
      background-color: ${props => props.theme.colors['gold100-transparent']};
    `,
        info: styled.css `
      background-color: ${props => props.theme.colors['gray50-transparent']};
    `,
        neutral: styled.css `
      background-color: ${props => props.theme.colors.gray50};
    `,
        loading: styled.css `
      background-color: ${props => props.theme.colors.gray50};
    `,
    },
}) `
  ${tendUiStyling.margin};
  ${props => props.$border && props.$borders[props.$type]};
  ${props => props.$layouts[props.$type]};

  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 16px;
  border-radius: 10px;
`;
const CloseButton = styled__default["default"].button `
  cursor: pointer;
  display: flex;
  padding: 0;
  margin: 0;
  border-color: transparent;
  background: transparent;
  color: ${props => props.theme.colors.gray650};

  /* Animation */
  transition: 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  transition-property: color;

  &:hover {
    color: ${props => props.theme.colors.gray900};
  }
`;
const Action = styled__default["default"].div `
  font-family: ${props => props.theme.fonts.museo};
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
`;

exports.Action = Action;
exports.CloseButton = CloseButton;
exports.Root = Root;
