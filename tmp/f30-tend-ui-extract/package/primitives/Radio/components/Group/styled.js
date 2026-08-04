import AntRadio from 'antd-core/es/radio';
import styled, { css } from 'styled-components';

// eslint-disable-next-line import/no-named-as-default-member
const Root = styled(AntRadio.Group) `
  &.tend-ui-radio-group {
    display: inline-flex;

    ${props => {
    if (props.$layout === 'vertical') {
        return css `
          flex-direction: column;
          row-gap: 8px;
        `;
    }
    return css `
        .tend-ui-radio-wrapper {
          margin-inline-end: 16px;
        }
      `;
}}

    .tend-ui-radio-wrapper {
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
    ${props => props.$fullWidth &&
    css `
        &.tend-ui-radio-group {
          width: 100%;
          .tend-ui-radio + span {
            display: inline-block;
            width: 100%;
          }
        }
      `};
  }
`;

export { Root };
