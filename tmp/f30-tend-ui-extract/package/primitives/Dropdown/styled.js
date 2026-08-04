import AntDropdown from 'antd-core/es/dropdown';
import styled from 'styled-components';
import { withInjectedClassName } from '../../hocs/withInjectedClassName/withInjectedClassName.js';
import { Box } from '@10d/tend-ui-grid';

const Root = styled(withInjectedClassName(AntDropdown, 'overlayClassName')) ``;
const Content = styled(Box) `
  border-radius: 12px;
  background: white;
  box-shadow: 0px 0px 32px 0px rgba(0, 0, 0, 0.1);

  .tend-ui-dropdown-menu .tend-ui-dropdown-menu-item {
    line-height: 20px;
  }
`;

export { Content, Root };
