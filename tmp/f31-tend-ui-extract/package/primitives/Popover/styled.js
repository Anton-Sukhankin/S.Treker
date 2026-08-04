import AntPopover from 'antd-core/es/popover';
import styled from 'styled-components';
import { withInjectedClassName } from '../../hocs/withInjectedClassName/withInjectedClassName.js';

const Root = styled(withInjectedClassName(AntPopover, 'overlayClassName')) `
  &.tend-ui-popover {
    .tend-ui-popover-title {
      font-size: 16px;
    }
    .tend-ui-popover-inner {
      padding: 16px;
    }
  }
`;

export { Root };
