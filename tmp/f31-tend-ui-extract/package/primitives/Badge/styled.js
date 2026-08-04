import styled, { css } from 'styled-components';
import { pointer } from '@10d/tend-ui-styling';

const font = css `
  font-family: ${props => props.theme.fonts.museo};
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
`;
const Content = styled.span `
  ${font}
`;
const Root = styled.span `
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 8px;
`;
const placementCss = {
    leftTop: css `
    top: 0;
    left: 0;
  `,
    rightTop: css `
    top: 0;
    right: 0;
  `,
    rightBottom: css `
    bottom: 0;
    right: 0;
  `,
    leftBottom: css `
    bottom: 0;
    left: 0;
  `,
};
const Bubble = styled.span `
  ${font};
  ${props => ({
    status: css `
        width: 8px;
        height: 8px;
        border-radius: 50%;
      `,
    dot: css `
        position: absolute;
        z-index: 999;
        ${placementCss[props.$placement || 'rightTop']}
        transform: translate(${props.$offset[0]}px, ${props.$offset[1]}px);
        width: 8px;
        height: 8px;
        border-radius: 50%;
      `,
    counter: css `
        position: absolute;
        z-index: 999;
        ${placementCss[props.$placement || 'leftTop']}
        transform: translate(${props.$offset[0]}px, ${props.$offset[1]}px);
        padding: 0 4px;
        border-radius: 32px;
      `,
    bubble: css `
        padding: ${props.$padding || '2px 8px'};
        border-radius: 28px;
      `,
}[props.$shape])};

  ${props => ({
    default: css `
        background-color: ${props => props.theme.colors.gray50};
      `,
    success: css `
        background-color: ${props => props.theme.colors.green600};
      `,
    warning: css `
        background-color: ${props => props.theme.colors.gold600};
      `,
    processing: css `
        background-color: ${props => props.theme.colors.blue600};
      `,
    error: css `
        background-color: ${props => props.theme.colors.red600};
      `,
    gray: css `
        color: ${props.theme.colors.gray0};
        background-color: ${props.theme.colors.gray650};
      `,
    blue: css `
        color: ${props.theme.colors.gray0};
        background-color: ${props.theme.colors.blue600};
      `,
    geekblue: css `
        color: ${props.theme.colors.gray0};
        background-color: ${props.theme.colors.geekblue600};
      `,
    green: css `
        color: ${props.theme.colors.gray0};
        background-color: ${props.theme.colors.green600};
      `,
    yellow: css `
        color: ${props.theme.colors.gray0};
        background-color: ${props.theme.colors.gold600};
      `,
    red: css `
        color: ${props.theme.colors.gray0};
        background-color: ${props.theme.colors.red600};
      `,
    cyan: css `
        color: ${props.theme.colors.gray0};
        background-color: ${props.theme.colors.cyan600};
      `,
    volcano: css `
        color: ${props.theme.colors.gray0};
        background-color: ${props.theme.colors.volcano600};
      `,
    purple: css `
        color: ${props.theme.colors.gray0};
        background-color: ${props.theme.colors.purple600};
      `,
    'gray-light': css `
        color: ${props.theme.colors.gray650};
        background-color: ${props.theme.colors.gray50};
      `,
    'blue-light': css `
        color: ${props.theme.colors.blue700};
        background-color: ${props.theme.colors.blue100};
      `,
    'geekblue-light': css `
        color: ${props.theme.colors.geekblue600};
        background-color: ${props.theme.colors.geekblue200};
      `,
    'green-light': css `
        color: ${props.theme.colors.green700};
        background-color: ${props.theme.colors.green100};
      `,
    'yellow-light': css `
        color: ${props.theme.colors.gold800};
        background-color: ${props.theme.colors.gold200};
      `,
    'red-light': css `
        color: ${props.theme.colors.red700};
        background-color: ${props.theme.colors.red100};
      `,
    'cyan-light': css `
        color: ${props.theme.colors.cyan800};
        background-color: ${props.theme.colors.cyan100};
      `,
    'volcano-light': css `
        color: ${props.theme.colors.volcano700};
        background-color: ${props.theme.colors.volcano100};
      `,
    'purple-light': css `
        color: ${props.theme.colors.purple500};
        background-color: ${props.theme.colors.purple100};
      `,
}[props.$preset])};

  ${pointer};
`;

export { Bubble, Content, Root };
