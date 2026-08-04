import AntForm from 'antd-core/es/form';
import styled from 'styled-components';

const Root = styled(AntForm) `
  display: flex;
  flex-direction: column;
  gap: ${props => `${props.$gap || 16}px`};
`;

export { Root };
