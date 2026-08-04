import { width, height } from '@10d/tend-ui-styling';
import styled from 'styled-components';

const Root = styled.div `
  box-sizing: border-box;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  ${width};
  ${height};
`;
const Img = styled.img `
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export { Img, Root };
