import styled, { css } from 'styled-components';
import { margin } from '@10d/tend-ui-styling';
import { Resizer } from '@10d/tend-ui-icons/Resizer';

const ResizerIcon = styled(Resizer) `
  pointer-events: none;
  position: absolute;
  bottom: 3px;
  right: 3px;
  z-index: 500;
`;
const Container = styled.div `
  ${props => props.$fullWidth &&
    css `
      width: 100%;
    `}

  position: relative;

  textarea {
    &::-webkit-resizer {
      display: none;
    }
  }

  .tend-ui-input-textarea-show-count {
    .tend-ui-input-data-count {
      bottom: -18px;
      font-size: 12px;
    }
  }

  ${margin};
`;

export { Container, ResizerIcon };
