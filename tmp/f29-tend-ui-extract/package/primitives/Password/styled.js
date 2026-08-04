import AntPassword from 'antd-core/es/input/Password';
import styled from 'styled-components';

const Root = styled(AntPassword) `
  .tend-ui-input-prefix,
  .tend-ui-input-suffix {
    color: ${props => props.$theme.colors.gray500};
  }
`;

export { Root };
