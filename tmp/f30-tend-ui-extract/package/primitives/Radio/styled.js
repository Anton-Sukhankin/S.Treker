import AntRadio from 'antd-core/es/radio';
import styled from 'styled-components';

const Root = styled(AntRadio) `
  &.tend-ui-radio-wrapper {
    /* Aligning Radio */
    .tend-ui-radio {
      align-self: flex-start;
    }

    /* Checked state */
    .tend-ui-radio-checked {
      &:not(.tend-ui-radio-disabled) {
        /* Active state color */
        .tend-ui-radio-inner {
          /* TODO: Replace by token */
          background-color: ${props => props.$theme.colors.gray0};

          /* TODO: Replace by token */
          &:after {
            background-color: ${props => props.$theme.colors.blue600};
          }
        }
      }
    }
  }
`;

export { Root };
