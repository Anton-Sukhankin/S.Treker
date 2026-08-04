'use strict';

var styled = require('styled-components');
var tendUiStyling = require('@10d/tend-ui-styling');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var styled__default = /*#__PURE__*/_interopDefault(styled);

const font = styled.css `
  font-family: ${props => props.theme.fonts.museo};
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
`;
const Content = styled__default["default"].span `
  ${font}
`;
const Root = styled__default["default"].span `
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 8px;
`;
const placementCss = {
    leftTop: styled.css `
    top: 0;
    left: 0;
  `,
    rightTop: styled.css `
    top: 0;
    right: 0;
  `,
    rightBottom: styled.css `
    bottom: 0;
    right: 0;
  `,
    leftBottom: styled.css `
    bottom: 0;
    left: 0;
  `,
};
const Bubble = styled__default["default"].span `
  ${font};
  ${props => ({
    status: styled.css `
        width: 8px;
        height: 8px;
        border-radius: 50%;
      `,
    dot: styled.css `
        position: absolute;
        z-index: 999;
        ${placementCss[props.$placement || 'rightTop']}
        transform: translate(${props.$offset[0]}px, ${props.$offset[1]}px);
        width: 8px;
        height: 8px;
        border-radius: 50%;
      `,
    counter: styled.css `
        position: absolute;
        z-index: 999;
        ${placementCss[props.$placement || 'leftTop']}
        transform: translate(${props.$offset[0]}px, ${props.$offset[1]}px);
        padding: 0 4px;
        border-radius: 32px;
      `,
    bubble: styled.css `
        padding: ${props.$padding || '2px 8px'};
        border-radius: 28px;
      `,
}[props.$shape])};

  ${props => ({
    default: styled.css `
        background-color: ${props => props.theme.colors.gray50};
      `,
    success: styled.css `
        background-color: ${props => props.theme.colors.green600};
      `,
    warning: styled.css `
        background-color: ${props => props.theme.colors.gold600};
      `,
    processing: styled.css `
        background-color: ${props => props.theme.colors.blue600};
      `,
    error: styled.css `
        background-color: ${props => props.theme.colors.red600};
      `,
    gray: styled.css `
        color: ${props.theme.colors.gray0};
        background-color: ${props.theme.colors.gray650};
      `,
    blue: styled.css `
        color: ${props.theme.colors.gray0};
        background-color: ${props.theme.colors.blue600};
      `,
    geekblue: styled.css `
        color: ${props.theme.colors.gray0};
        background-color: ${props.theme.colors.geekblue600};
      `,
    green: styled.css `
        color: ${props.theme.colors.gray0};
        background-color: ${props.theme.colors.green600};
      `,
    yellow: styled.css `
        color: ${props.theme.colors.gray0};
        background-color: ${props.theme.colors.gold600};
      `,
    red: styled.css `
        color: ${props.theme.colors.gray0};
        background-color: ${props.theme.colors.red600};
      `,
    cyan: styled.css `
        color: ${props.theme.colors.gray0};
        background-color: ${props.theme.colors.cyan600};
      `,
    volcano: styled.css `
        color: ${props.theme.colors.gray0};
        background-color: ${props.theme.colors.volcano600};
      `,
    purple: styled.css `
        color: ${props.theme.colors.gray0};
        background-color: ${props.theme.colors.purple600};
      `,
    'gray-light': styled.css `
        color: ${props.theme.colors.gray650};
        background-color: ${props.theme.colors.gray50};
      `,
    'blue-light': styled.css `
        color: ${props.theme.colors.blue700};
        background-color: ${props.theme.colors.blue100};
      `,
    'geekblue-light': styled.css `
        color: ${props.theme.colors.geekblue600};
        background-color: ${props.theme.colors.geekblue200};
      `,
    'green-light': styled.css `
        color: ${props.theme.colors.green700};
        background-color: ${props.theme.colors.green100};
      `,
    'yellow-light': styled.css `
        color: ${props.theme.colors.gold800};
        background-color: ${props.theme.colors.gold200};
      `,
    'red-light': styled.css `
        color: ${props.theme.colors.red700};
        background-color: ${props.theme.colors.red100};
      `,
    'cyan-light': styled.css `
        color: ${props.theme.colors.cyan800};
        background-color: ${props.theme.colors.cyan100};
      `,
    'volcano-light': styled.css `
        color: ${props.theme.colors.volcano700};
        background-color: ${props.theme.colors.volcano100};
      `,
    'purple-light': styled.css `
        color: ${props.theme.colors.purple500};
        background-color: ${props.theme.colors.purple100};
      `,
}[props.$preset])};

  ${tendUiStyling.pointer};
`;

exports.Bubble = Bubble;
exports.Content = Content;
exports.Root = Root;
