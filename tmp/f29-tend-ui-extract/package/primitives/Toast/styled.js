import styled, { createGlobalStyle } from 'styled-components';

/**
 * @deprecated Можно удалить, стили поставляются из коробки
 */
const Styles = createGlobalStyle ``;
const Footer = styled.div `
  display: flex;
  align-items: center;
  gap: 20px;
  margin-top: 12px;
`;

export { Footer, Styles };
