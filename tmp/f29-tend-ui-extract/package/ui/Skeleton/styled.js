import styled, { keyframes } from 'styled-components';
import { Box } from '@10d/tend-ui-grid';

const opacity = keyframes `
  100% {
    opacity: .5;
  }
  `;
const Root = styled(Box) `
  animation: ${opacity} ease-in-out 1s infinite alternate;
`;

export { Root };
