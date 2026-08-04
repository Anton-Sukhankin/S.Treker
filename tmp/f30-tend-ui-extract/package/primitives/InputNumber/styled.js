import styled, { css } from 'styled-components';
import AntInputNumber from 'antd-core/es/input-number';

const Root = styled(AntInputNumber) `
  ${props => props.$fullWidth &&
    css `
      &.tend-ui-input-number,
      &.tend-ui-input-number-affix-wrapper {
        width: 100%;
      }
    `}

  input {
    text-overflow: ellipsis;
  }

  &.tend-ui-input-number-affix-wrapper {
    .tend-ui-input-number-prefix,
    .tend-ui-input-number-suffix {
      color: ${props => props.$theme.colors.gray500};
    }
  }
`;

export { Root };
