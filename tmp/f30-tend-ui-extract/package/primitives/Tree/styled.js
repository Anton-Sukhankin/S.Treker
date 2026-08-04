import styled from 'styled-components';
import AntTree from 'antd-core/es/tree/Tree';

const Root = styled(AntTree) `
  &.tend-ui-tree {
    .tend-ui-tree-switcher {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      margin-right: 8px;
    }
    .tend-ui-tree-checkbox .tend-ui-tree-checkbox-inner {
      border-radius: 4px;
    }
  }
`;

export { Root };
