import styled from 'styled-components';
import AntSegmented from 'antd-core/es/segmented';

const Root = styled(AntSegmented) `
  &.tend-ui-segmented {
    padding: 4px;
    border: 1px solid ${props => props.$theme.colors.gray200};

    .tend-ui-segmented-item-label {
      min-height: 20px;
      line-height: 20px;
    }
  }
`;

export { Root };
