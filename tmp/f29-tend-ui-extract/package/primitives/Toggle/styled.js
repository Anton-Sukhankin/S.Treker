import styled, { css } from 'styled-components';

const Container = styled.label `
  ${props => {
    if (props.$disabled) {
        return css `
        cursor: not-allowed;
      `;
    }
    return css `
      cursor: pointer;
    `;
}}

  display: inline-flex;
  align-items: flex-start;
  gap: 8px;
`;

export { Container };
