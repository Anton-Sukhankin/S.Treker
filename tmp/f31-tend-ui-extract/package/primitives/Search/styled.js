import AntSearch from 'antd-core/es/input/Search';
import styled from 'styled-components';
import { width, margin } from '@10d/tend-ui-styling';

const Root = styled(AntSearch) `
  input {
    text-overflow: ellipsis;
  }

  .tend-ui-input-prefix,
  .tend-ui-input-suffix {
    color: ${props => props.$theme.colors.gray500};
  }

  &.tend-ui-input-search {
    ${width};
    ${margin};
  }
`;

export { Root };
