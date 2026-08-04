import styled from 'styled-components';

const Root = styled.img `
  width: 100%;
  height: 100%;
  object-fit: ${props => props.$objectFit};
`;

export { Root };
