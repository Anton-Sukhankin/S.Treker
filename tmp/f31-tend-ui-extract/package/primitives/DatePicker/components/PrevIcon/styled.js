import styled from 'styled-components';
import { colors } from '@10d/tend-ui-tokens/samolet';
import { ChevronLeft } from '@10d/tend-ui-icons/ChevronLeft';

const PrevIcon = styled(ChevronLeft) `
  padding: 8px;
  border-radius: 8px;
  border: 1px solid ${colors.gray50};
  transition: all 0.3s;
  &:hover:not(:active) {
    border-color: ${colors.blue600};
  }
  &:active {
    background-color: ${colors.blue100};
  }
`;

export { PrevIcon };
