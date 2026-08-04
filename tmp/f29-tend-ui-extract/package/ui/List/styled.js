import styled, { css } from 'styled-components';
import { scrollbar } from '../../styling/mixins/scrollbar.js';
import { isUndefined } from '@10d/tend-ui-utils';

const Root = styled.ul `
  display: flex;
  flex-direction: column;
  list-style: none;
  padding: 0;
  margin: 0;

  ${props => {
    if (isUndefined(props.$gap))
        return;
    return css `
      gap: ${props.$gap}px;
    `;
}};

  ${props => {
    if (!props.$scrollable)
        return;
    return css `
      max-height: ${props.$maxHeight || '160px'};
      overflow: auto;
    `;
}}

  ${scrollbar};
`;

export { Root };
