import styled from 'styled-components';

const Root = styled.div `
  font-family: ${props => props.theme.fonts.museo};
  font-size: 14px;
  overflow: hidden;
  height: ${props => (props.$open ? 'auto' : '0px')};
  > :nth-child(1) {
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding: 4px 0 0 40px;
  }
`;

export { Root };
