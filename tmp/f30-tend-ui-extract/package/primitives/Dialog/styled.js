import styled, { createGlobalStyle } from 'styled-components';
import { Box as Box$1 } from '@10d/tend-ui-grid';

/**
 * @deprecated Можно удалить, стили поставляются из коробки
 */
const Styles = createGlobalStyle ``;
const Img = styled.img `
  width: 100%;
  height: 100%;
  object-fit: contain;
`;
const ImageContainer = styled.div `
  height: 100%;
  width: 100%;
  margin-bottom: 20px;
  overflow: hidden;
  border-radius: ${props => (props.$layout === 'contain' ? '8px' : '16px 16px 0 0')};
`;
const Box = styled(Box$1) `
  font-family: Museo Sans Cyrl;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
`;

export { Box, ImageContainer, Img, Styles };
