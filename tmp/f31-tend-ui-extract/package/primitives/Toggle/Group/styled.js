import styled, { css } from 'styled-components';

const Root = styled.div `
  display: flex;

  ${props => {
    if (props.$layout === 'vertical') {
        return css `
        flex-direction: column;
        gap: 8px;
      `;
    }
    return css `
      gap: 24px;
    `;
}}
`;

export { Root };
