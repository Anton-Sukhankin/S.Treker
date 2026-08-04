import styled from 'styled-components';
import { isNumber } from '@10d/tend-ui-utils';
import { scrollbar } from '../../styling/mixins/scrollbar.js';

const Root = styled.div `
  ${scrollbar};
  width: 100%;
  overflow: auto;
  // FIXME: Выглядит как костыль, возможно, есть более правильное решение
  // https://stackoverflow.com/questions/10251369/css-max-height-and-overflow-auto-always-displays-vertical-scroll
  // Проблема неидеальности шрифтов и появления вертикального скролла
  padding-bottom: 1px;
  margin-bottom: -1px;
  max-height: ${props => {
    if (isNumber(props.$maxHeight))
        return `${props.$maxHeight}px`;
    return props.$maxHeight;
}};
`;

export { Root };
